'use strict';

const cron    = require('node-cron');
const winston = nodebb.require('winston');
const db      = nodebb.require('./src/database');

let job = null;

/**
 * incomeTick – läuft jede Minute, aber passives Einkommen wird hauptsächlich
 * lazy beim nächsten PlayerService.get() angewendet (applyPassiveIncome).
 * Dieser Job aktualisiert nur die Rangliste für alle aktiven Spieler.
 */
function start() {
	if (job) return;

	job = cron.schedule('* * * * *', async () => {
		try {
			// Get all players from leaderboard sorted set and update their net worth
			const uids = await db.getSortedSetRange('kapitalia:players', 0, -1);
			if (!uids || uids.length === 0) return;

			const EconomyService = require('../services/EconomyService');
			const MissionService = require('../services/MissionService');

			for (const uid of uids) {
				try {
					const economy = await EconomyService.getSnapshot(uid);
					await MissionService.checkNetWorth(uid, economy.netWorth);
				} catch (e) {
					winston.verbose(`[Kapitalia] incomeTick skip uid ${uid}: ${e.message}`);
				}
			}

			winston.verbose('[Kapitalia] incomeTick complete');
		} catch (e) {
			winston.error('[Kapitalia] incomeTick error:', e);
		}
	});

	winston.info('[Kapitalia] incomeTick job started (every 1 minute)');
}

function stop() {
	if (job) {
		job.destroy();
		job = null;
		winston.info('[Kapitalia] incomeTick job stopped');
	}
}

module.exports = { start, stop };
