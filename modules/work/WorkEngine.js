'use strict';

const db = nodebb.require('./src/database');
const PlayerService  = require('../../services/PlayerService');
const CareerService  = require('../../services/CareerService');
const financialAnalysis = require('./tasks/financial_analysis');
const accounting        = require('./tasks/accounting');
const marketAnalysis    = require('./tasks/market_analysis');

const TASK_REGISTRY = {
	valuation:       financialAnalysis,
	accounting:      accounting,
	market_analysis: marketAnalysis,
};

const taskKey    = uid => `kapitalia:work:task:${uid}`;
const historyKey = uid => `kapitalia:work:history:${uid}`;

/**
 * Get or generate a current pending task for the player.
 */
async function getCurrentTask(uid) {
	const raw = await db.getObject(taskKey(uid));
	if (raw && raw.id) return deserializeTask(raw);
	return generateTask(uid);
}

async function generateTask(uid) {
	const player = await PlayerService.getOrCreate(uid);
	const careerStage = CareerService.getStage(player.career);
	const types = careerStage.unlockedTaskTypes;

	// Pick a random task type from unlocked types
	const type = types[Math.floor(Math.random() * types.length)];
	const provider = TASK_REGISTRY[type];

	if (!provider) return null;

	const task = provider.generate();
	task.id   = `${type}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
	task.type = type;
	task.createdAt = Date.now();

	await db.setObject(taskKey(uid), serializeTask(task));
	return task;
}

async function submitAnswer(uid, taskId, answer) {
	const raw = await db.getObject(taskKey(uid));
	if (!raw || raw.id !== taskId) {
		return { correct: false, message: 'Aufgabe nicht gefunden oder abgelaufen.', reward: null };
	}

	const task = deserializeTask(raw);
	const provider = TASK_REGISTRY[task.type];
	if (!provider) return { correct: false, message: 'Unbekannter Aufgabentyp.', reward: null };

	const result = provider.check(task, answer);

	// Record in history
	await db.sortedSetAdd(historyKey(uid), Date.now(), JSON.stringify({
		taskId,
		type:    task.type,
		correct: result.correct,
		ts:      Date.now(),
	}));

	// Remove current task (generate fresh on next visit)
	await db.delete(taskKey(uid));

	if (result.correct) {
		await PlayerService.addCash(uid, result.reward.cash);
		await PlayerService.addXP(uid, result.reward.xp);
		if (result.reward.skillpoints) {
			await PlayerService.addSkillpoints(uid, result.reward.skillpoints);
		}
	}

	return result;
}

async function getHistory(uid, limit = 5) {
	const entries = await db.getSortedSetRevRange(historyKey(uid), 0, limit - 1);
	if (!entries) return [];
	return entries.map(e => {
		try { return JSON.parse(e); } catch { return null; }
	}).filter(Boolean);
}

function serializeTask(task) {
	return {
		id:        task.id,
		type:      task.type,
		question:  task.question,
		options:   JSON.stringify(task.options || []),
		answer:    String(task.answer),
		reward:    JSON.stringify(task.reward),
		createdAt: String(task.createdAt),
		context:   JSON.stringify(task.context || {}),
	};
}

function deserializeTask(raw) {
	return {
		id:        raw.id,
		type:      raw.type,
		question:  raw.question,
		options:   raw.options  ? JSON.parse(raw.options)  : [],
		answer:    raw.answer,
		reward:    raw.reward   ? JSON.parse(raw.reward)   : {},
		createdAt: parseInt(raw.createdAt, 10) || 0,
		context:   raw.context  ? JSON.parse(raw.context)  : {},
	};
}

module.exports = { getCurrentTask, generateTask, submitAnswer, getHistory };
