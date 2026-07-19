'use strict';

const winston = require.main.require('winston');
const PlayerService  = require('../services/PlayerService');
const EconomyService = require('../services/EconomyService');
const MissionService = require('../services/MissionService');
const LeaderboardService = require('../services/LeaderboardService');

exports.render = async function (req, res) {
	try {
		const uid = req.uid;
		const player  = await PlayerService.getOrCreate(uid);
		const economy = await EconomyService.getSnapshot(uid);
		const missions = await MissionService.getActive(uid);
		const rank = await LeaderboardService.getRank(uid);

		res.render('kapitalia/dashboard', {
			title: 'Kapitalia – Dashboard',
			player,
			economy,
			missions,
			rank,
			breadcrumbs: [{ text: 'Kapitalia' }],
		});
	} catch (e) {
		winston.error('[Kapitalia] dashboard error:', e);
		res.status(500).send('Interner Fehler');
	}
};
