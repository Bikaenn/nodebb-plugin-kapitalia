'use strict';

const winston = nodebb.require('winston');
const StockService   = require('../../services/StockService');
const MissionService = require('../../services/MissionService');

exports.buy = async function (req, res) {
	try {
		const uid = req.uid;
		const { symbol, amount } = req.body;
		const qty = parseInt(amount, 10);

		if (!symbol || isNaN(qty) || qty < 1) {
			req.session.kapitaliaFlash = { type: 'danger', message: 'Ungültige Eingabe.' };
			return res.redirect('/kapitalia/market');
		}

		const result = await StockService.buy(uid, symbol, qty);
		if (!result.ok) {
			req.session.kapitaliaFlash = { type: 'danger', message: result.message };
		} else {
			req.session.kapitaliaFlash = { type: 'success', message: result.message };
			await MissionService.check(uid, 'stock_buy');
		}
		return res.redirect('/kapitalia/market');
	} catch (e) {
		winston.error('[Kapitalia] market buy error:', e);
		req.session.kapitaliaFlash = { type: 'danger', message: 'Interner Fehler.' };
		return res.redirect('/kapitalia/market');
	}
};

exports.sell = async function (req, res) {
	try {
		const uid = req.uid;
		const { symbol, amount } = req.body;
		const qty = parseInt(amount, 10);

		if (!symbol || isNaN(qty) || qty < 1) {
			req.session.kapitaliaFlash = { type: 'danger', message: 'Ungültige Eingabe.' };
			return res.redirect('/kapitalia/portfolio');
		}

		const result = await StockService.sell(uid, symbol, qty);
		req.session.kapitaliaFlash = result.ok
			? { type: 'success', message: result.message }
			: { type: 'danger',  message: result.message };

		return res.redirect('/kapitalia/portfolio');
	} catch (e) {
		winston.error('[Kapitalia] market sell error:', e);
		req.session.kapitaliaFlash = { type: 'danger', message: 'Interner Fehler.' };
		return res.redirect('/kapitalia/portfolio');
	}
};
