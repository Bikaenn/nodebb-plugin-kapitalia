'use strict';

const winston = require.main.require('winston');
const WorkEngine     = require('../../modules/work/WorkEngine');
const MissionService = require('../../services/MissionService');

// Rate limit: max 1 submission per 10 seconds per UID
const lastSubmit = new Map();
const RATE_LIMIT_MS = 10000;

exports.submit = async function (req, res) {
	const uid = req.uid;
	const now = Date.now();

	if (lastSubmit.has(uid) && (now - lastSubmit.get(uid)) < RATE_LIMIT_MS) {
		return res.status(429).json({ ok: false, message: 'Zu schnell! Bitte warte etwas.' });
	}
	lastSubmit.set(uid, now);

	try {
		const { taskId, answer } = req.body;

		if (!taskId || answer === undefined || answer === null || answer === '') {
			return res.status(400).json({ ok: false, message: 'Ungültige Eingabe.' });
		}

		const result = await WorkEngine.submitAnswer(uid, taskId, String(answer).trim());
		await MissionService.check(uid, 'work_complete');

		return res.json({ ok: true, correct: result.correct, reward: result.reward, message: result.message });
	} catch (e) {
		winston.error('[Kapitalia] work submit error:', e);
		return res.status(500).json({ ok: false, message: 'Interner Fehler.' });
	}
};
