'use strict';

const STOCKS = [
	{ symbol: 'TEC', name: 'TechNova',   category: 'Technologie',  basePrice: 120 },
	{ symbol: 'GRV', name: 'GreenVolt',  category: 'Energie',      basePrice: 85  },
	{ symbol: 'EUR', name: 'EuroBank',   category: 'Finanzen',     basePrice: 200 },
	{ symbol: 'CLD', name: 'CloudSoft',  category: 'Technologie',  basePrice: 340 },
	{ symbol: 'AUX', name: 'AutoLux',    category: 'Automobil',    basePrice: 150 },
	{ symbol: 'HLT', name: 'HealthOne',  category: 'Gesundheit',   basePrice: 95  },
	{ symbol: 'FAI', name: 'FinAI',      category: 'Finanzen',     basePrice: 270 },
	{ symbol: 'ENX', name: 'EnergyX',    category: 'Energie',      basePrice: 60  },
];

function deserialize(raw) {
	return {
		symbol:     raw.symbol,
		name:       raw.name,
		category:   raw.category,
		price:      parseFloat(raw.price) || 0,
		change:     parseFloat(raw.change) || 0,
		updatedAt:  parseInt(raw.updatedAt, 10) || 0,
	};
}

function serialize(stock) {
	return {
		symbol:    stock.symbol,
		name:      stock.name,
		category:  stock.category,
		price:     String(stock.price),
		change:    String(stock.change),
		updatedAt: String(stock.updatedAt || Date.now()),
	};
}

module.exports = { STOCKS, deserialize, serialize };
