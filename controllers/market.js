'use strict';

const winston = require.main.require('winston');
const PlayerService = require('../services/PlayerService');
const StockService  = require('../services/StockService');

exports.render = async function (req, res) {
	try {
		const uid = req.uid;
		const player = await PlayerService.getOrCreate(uid);
		const stocks  = await StockService.getAllStocks();
		const flash   = req.session.kapitaliaFlash || null;
		delete req.session.kapitaliaFlash;

		res.render('kapitalia/market', {
			title: 'Kapitalia – Börse',
			player,
			stocks,
			flash,
			breadcrumbs: [{ text: 'Kapitalia', url: '/kapitalia' }, { text: 'Börse' }],
		});
	} catch (e) {
		winston.error('[Kapitalia] market error:', e);
		res.status(500).send('Interner Fehler');
	}
};
