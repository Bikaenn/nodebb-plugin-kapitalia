'use strict';

const db = nodebb.require('./src/database');
const PlayerService = require('./PlayerService');
const { deserialize, serialize, STOCKS } = require('../models/Stock');

const stockKey   = symbol => `kapitalia:stock:${symbol}`;
const historyKey = symbol => `kapitalia:stock:history:${symbol}`;
const HISTORY_MAX = 100;

async function getStock(symbol) {
	const raw = await db.getObject(stockKey(symbol));
	if (!raw) return null;
	return deserialize({ ...raw, symbol });
}

async function getAllStocks() {
	const stocks = await Promise.all(STOCKS.map(s => getStock(s.symbol)));
	return stocks.filter(Boolean);
}

async function getBySymbols(symbols) {
	const stocks = await Promise.all(symbols.map(s => getStock(s)));
	return stocks.filter(Boolean);
}

async function saveStock(stock) {
	await db.setObject(stockKey(stock.symbol), serialize(stock));
	// Push to history sorted set (score = timestamp, value = price)
	await db.sortedSetAdd(historyKey(stock.symbol), Date.now(), String(stock.price));
	// Trim history to HISTORY_MAX
	const count = await db.sortedSetCard(historyKey(stock.symbol));
	if (count > HISTORY_MAX) {
		await db.sortedSetRemoveRangeByRank(historyKey(stock.symbol), 0, count - HISTORY_MAX - 1);
	}
}

async function getHistory(symbol, limit = 30) {
	const scores = await db.getSortedSetRevRangeByScoreWithScores(historyKey(symbol), '+inf', '-inf', 0, limit);
	if (!scores) return [];
	// Returns [{value, score}] — value = price string, score = timestamp
	return scores.map(entry => ({ price: parseFloat(entry.value), ts: entry.score })).reverse();
}

async function buy(uid, symbol, qty) {
	if (qty < 1) return { ok: false, message: 'Ungültige Menge.' };

	const stock = await getStock(symbol);
	if (!stock) return { ok: false, message: 'Aktie nicht gefunden.' };

	const totalCost = stock.price * qty;
	const deduct = await PlayerService.deductCash(uid, totalCost);
	if (!deduct.ok) return { ok: false, message: deduct.message };

	const player = deduct.player;
	const currentQty = (player.holdings[symbol] || 0);
	await PlayerService.updateHolding(uid, symbol, currentQty + qty);

	return {
		ok: true,
		message: `${qty} × ${stock.name} für ${totalCost.toFixed(2)} € gekauft.`,
	};
}

async function sell(uid, symbol, qty) {
	if (qty < 1) return { ok: false, message: 'Ungültige Menge.' };

	const player = await PlayerService.getOrCreate(uid);
	const owned = player.holdings[symbol] || 0;
	if (owned < qty) return { ok: false, message: `Du hast nur ${owned} Anteile.` };

	const stock = await getStock(symbol);
	if (!stock) return { ok: false, message: 'Aktie nicht gefunden.' };

	const proceeds = stock.price * qty;
	const newQty = owned - qty;
	await PlayerService.updateHolding(uid, symbol, newQty);
	await PlayerService.addCash(uid, proceeds);

	return {
		ok: true,
		message: `${qty} × ${stock.name} für ${proceeds.toFixed(2)} € verkauft.`,
	};
}

async function getPortfolio(uid) {
	const player = await PlayerService.getOrCreate(uid);
	const holdings = player.holdings || {};
	const symbols = Object.keys(holdings).filter(s => holdings[s] > 0);
	if (symbols.length === 0) return [];

	const stocks = await getBySymbols(symbols);
	return stocks.map(stock => ({
		...stock,
		qty:   holdings[stock.symbol] || 0,
		value: (holdings[stock.symbol] || 0) * stock.price,
	}));
}

module.exports = { getStock, getAllStocks, getBySymbols, saveStock, getHistory, buy, sell, getPortfolio };
