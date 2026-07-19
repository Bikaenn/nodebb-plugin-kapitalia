'use strict';

const winston = nodebb.require('winston');
const PlayerService = require('../services/PlayerService');
const StockService  = require('../services/StockService');
const EconomyService = require('../services/EconomyService');

exports.render = async function (req, res) {
	try {
		const uid = req.uid;
		const player   = await PlayerService.getOrCreate(uid);
		const holdings = await StockService.getPortfolio(uid);
		const economy  = await EconomyService.getSnapshot(uid);
		const flash    = req.session.kapitaliaFlash || null;
		delete req.session.kapitaliaFlash;

		res.render('kapitalia/portfolio', {
			title: 'Kapitalia – Portfolio',
			player,
			holdings,
			economy,
			flash,
			breadcrumbs: [{ text: 'Kapitalia', url: '/kapitalia' }, { text: 'Portfolio' }],
		});
	} catch (e) {
		winston.error('[Kapitalia] portfolio error:', e);
		res.status(500).send('Interner Fehler');
	}
};
