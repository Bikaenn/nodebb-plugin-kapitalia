'use strict';

const winston = require.main.require('winston');
const PlayerService      = require('../services/PlayerService');
const LeaderboardService = require('../services/LeaderboardService');

exports.render = async function (req, res) {
	try {
		const uid = req.uid;
		const player   = await PlayerService.getOrCreate(uid);
		const top100   = await LeaderboardService.getTop(100);
		const ownRank  = await LeaderboardService.getRank(uid);

		res.render('kapitalia/ranking', {
			title: 'Kapitalia – Rangliste',
			player,
			top100,
			ownRank,
			breadcrumbs: [{ text: 'Kapitalia', url: '/kapitalia' }, { text: 'Rangliste' }],
		});
	} catch (e) {
		winston.error('[Kapitalia] ranking error:', e);
		res.status(500).send('Interner Fehler');
	}
};
