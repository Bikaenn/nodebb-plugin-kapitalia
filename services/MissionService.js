'use strict';

const db = require.main.require('./src/database');
const { SEED_MISSIONS, deserializeProgress } = require('../models/Mission');
const PlayerService = require('./PlayerService');

const defKey      = id  => `kapitalia:mission:def:${id}`;
const progressKey = uid => `kapitalia:mission:progress:${uid}`;

async function seedMissions() {
	for (const mission of SEED_MISSIONS) {
		await db.setObject(defKey(mission.id), {
			id:            mission.id,
			title:         mission.title,
			description:   mission.description,
			event:         mission.event,
			targetCount:   String(mission.targetCount  || 0),
			targetAmount:  String(mission.targetAmount || 0),
			rewardCash:    String(mission.rewardCash),
			rewardXP:      String(mission.rewardXP),
		});
	}
}

async function getMissionDef(id) {
	const raw = await db.getObject(defKey(id));
	if (!raw) return null;
	return {
		id:           raw.id,
		title:        raw.title,
		description:  raw.description,
		event:        raw.event,
		targetCount:  parseInt(raw.targetCount, 10)  || 0,
		targetAmount: parseFloat(raw.targetAmount)   || 0,
		rewardCash:   parseFloat(raw.rewardCash)     || 0,
		rewardXP:     parseInt(raw.rewardXP, 10)     || 0,
	};
}

async function getAll(uid) {
	const ids = SEED_MISSIONS.map(m => m.id);
	const progressHash = await db.getObject(progressKey(uid)) || {};

	const results = [];
	for (const id of ids) {
		const def = await getMissionDef(id);
		if (!def) continue;
		const prog = progressHash[id] ? JSON.parse(progressHash[id]) : { status: 'active', progress: 0 };
		results.push({ ...def, ...prog });
	}
	return results;
}

async function getActive(uid) {
	const all = await getAll(uid);
	return all.filter(m => m.status !== 'completed');
}

async function check(uid, event) {
	const ids = SEED_MISSIONS.filter(m => m.event === event).map(m => m.id);
	if (ids.length === 0) return;

	const progressHash = await db.getObject(progressKey(uid)) || {};

	for (const id of ids) {
		const raw = progressHash[id] ? JSON.parse(progressHash[id]) : { status: 'active', progress: 0 };
		if (raw.status === 'completed') continue;

		const def = await getMissionDef(id);
		if (!def) continue;

		raw.progress = (raw.progress || 0) + 1;

		if (def.targetCount > 0 && raw.progress >= def.targetCount) {
			raw.status = 'completed';
			await grantReward(uid, def);
		}

		progressHash[id] = JSON.stringify(raw);
	}

	await db.setObject(progressKey(uid), progressHash);
}

async function checkNetWorth(uid, netWorth) {
	const ids = SEED_MISSIONS.filter(m => m.event === 'net_worth_check').map(m => m.id);
	if (ids.length === 0) return;

	const progressHash = await db.getObject(progressKey(uid)) || {};

	for (const id of ids) {
		const raw = progressHash[id] ? JSON.parse(progressHash[id]) : { status: 'active', progress: 0 };
		if (raw.status === 'completed') continue;

		const def = await getMissionDef(id);
		if (!def) continue;

		if (def.targetAmount > 0 && netWorth >= def.targetAmount) {
			raw.status = 'completed';
			await grantReward(uid, def);
			progressHash[id] = JSON.stringify(raw);
		}
	}

	await db.setObject(progressKey(uid), progressHash);
}

async function grantReward(uid, def) {
	if (def.rewardCash > 0) await PlayerService.addCash(uid, def.rewardCash);
	if (def.rewardXP > 0)   await PlayerService.addXP(uid, def.rewardXP);
}

module.exports = { seedMissions, getAll, getActive, check, checkNetWorth };
