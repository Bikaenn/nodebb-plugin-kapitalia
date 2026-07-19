'use strict';

/**
 * MarketDataProvider – Stub für echte Marktdaten (v0.2+).
 * Implementiert das gleiche Interface wie FictionalProvider.
 */
class MarketDataProvider {
	constructor(apiKey) {
		this.apiKey = apiKey;
	}

	/**
	 * TODO (v0.2): Echtdaten von einer externen API laden.
	 * Mapping: echte Symbole → fiktive Symbole für Spielkontinuität.
	 */
	async tick() {
		throw new Error('MarketDataProvider ist noch nicht implementiert. Verwende FictionalProvider.');
	}

	async getQuotes() {
		throw new Error('MarketDataProvider ist noch nicht implementiert.');
	}
}

module.exports = MarketDataProvider;
