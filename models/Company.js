'use strict';

const COMPANIES = [
	{ id: 'kiosk',         name: 'Kiosk',               price: 500,    incomePerMinute: 5,    description: 'Ein kleiner Zeitungskiosk an der Ecke.' },
	{ id: 'cafe',          name: 'Café',                price: 2000,   incomePerMinute: 20,   description: 'Ein gemütliches Café mit Stammkunden.' },
	{ id: 'restaurant',    name: 'Restaurant',          price: 10000,  incomePerMinute: 100,  description: 'Ein gehobenes Restaurant in der Innenstadt.' },
	{ id: 'investment_firm', name: 'Investmentfirma',  price: 100000, incomePerMinute: 1000, description: 'Eine Investmentfirma mit eigenem Handelsdesk.' },
];

function getById(id) {
	return COMPANIES.find(c => c.id === id) || null;
}

module.exports = { COMPANIES, getById };
