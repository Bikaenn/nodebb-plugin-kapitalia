'use strict';

const StockService = require('../../services/StockService');
const FictionalProvider = require('./providers/FictionalProvider');
const { STOCKS } = require('../../models/Stock');

const provider = new FictionalProvider();

async function seedStocks() {
	for (const stockDef of STOCKS) {
		const existing = await StockService.getStock(stockDef.symbol);
		if (!existing) {
			await StockService.saveStock({
				symbol:    stockDef.symbol,
				name:      stockDef.name,
				category:  stockDef.category,
				price:     stockDef.basePrice,
				change:    0,
				updatedAt: Date.now(),
			});
		}
	}
}

async function tick() {
	const quotes = await provider.tick();
	for (const quote of quotes) {
		await StockService.saveStock(quote);
	}
}

module.exports = { seedStocks, tick, provider };
