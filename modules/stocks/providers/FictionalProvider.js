'use strict';

const { STOCKS } = require('../../../models/Stock');
const StockService = require('../../../services/StockService');

/**
 * FictionalProvider – Random-Walk Simulation für fiktive Aktien.
 * Jede Aktie bewegt sich um ±3 % pro Tick mit leichter Drift nach oben.
 */
class FictionalProvider {
	constructor() {
		this.volatility = 0.03;     // 3% max Bewegung pro Tick
		this.drift      = 0.001;    // 0.1% positive Drift
		this.minPrice   = 1;
	}

	/**
	 * Führt einen Tick durch: aktualisiert alle Aktien-Kurse.
	 * @returns {Array} Updated stock objects
	 */
	async tick() {
		const updatedStocks = [];

		for (const def of STOCKS) {
			const existing = await StockService.getStock(def.symbol);
			const currentPrice = existing ? existing.price : def.basePrice;

			const changePercent = (Math.random() - 0.48) * this.volatility * 2 + this.drift;
			let newPrice = currentPrice * (1 + changePercent);
			newPrice = Math.max(this.minPrice, Math.round(newPrice * 100) / 100);

			const change = Math.round((changePercent * 100) * 100) / 100;

			updatedStocks.push({
				symbol:    def.symbol,
				name:      def.name,
				category:  def.category,
				price:     newPrice,
				change,
				updatedAt: Date.now(),
			});
		}

		return updatedStocks;
	}

	async getQuotes() {
		const quotes = [];
		for (const def of STOCKS) {
			const stock = await StockService.getStock(def.symbol);
			if (stock) quotes.push(stock);
		}
		return quotes;
	}
}

module.exports = FictionalProvider;
