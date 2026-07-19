'use strict';

const winston = require.main.require('winston');
const PlayerService  = require('../services/PlayerService');
const CareerService  = require('../services/CareerService');
const WorkEngine     = require('../modules/work/WorkEngine');

exports.render = async function (req, res) {
	try {
		const uid = req.uid;
		const player  = await PlayerService.getOrCreate(uid);
		const careerInfo = await CareerService.getInfo(player.career, player.level, player.netWorth || 0);
		const currentTask = await WorkEngine.getCurrentTask(uid);
		const taskHistory = await WorkEngine.getHistory(uid, 5);

		res.render('kapitalia/career', {
			title: 'Kapitalia – Karriere',
			player,
			careerInfo,
			currentTask,
			taskHistory,
			breadcrumbs: [{ text: 'Kapitalia', url: '/kapitalia' }, { text: 'Karriere' }],
		});
	} catch (e) {
		winston.error('[Kapitalia] career error:', e);
		res.status(500).send('Interner Fehler');
	}
};
