'use strict';

const winston = nodebb.require('winston');
const PlayerService  = require('../services/PlayerService');
const MissionService = require('../services/MissionService');

exports.render = async function (req, res) {
	try {
		const uid = req.uid;
		const player   = await PlayerService.getOrCreate(uid);
		const missions = await MissionService.getAll(uid);

		res.render('kapitalia/missions', {
			title: 'Kapitalia – Missionen',
			player,
			missions,
			breadcrumbs: [{ text: 'Kapitalia', url: '/kapitalia' }, { text: 'Missionen' }],
		});
	} catch (e) {
		winston.error('[Kapitalia] missions error:', e);
		res.status(500).send('Interner Fehler');
	}
};
