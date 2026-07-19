'use strict';

const DEFAULTS = {
	cash: 1000,
	level: 1,
	xp: 0,
	career: 'employee',
	companies: [],       // Array of company IDs owned
	holdings: {},        // { symbol: quantity }
	skillpoints: 0,
	lastIncomeTick: 0,
	createdAt: 0,
};

const CAREER_LABELS = {
	employee:     'Angestellter',
	freelancer:   'Selbstständiger',
	entrepreneur: 'Unternehmer',
	investor:     'Investor',
	mogul:        'Finanzmogul',
};

/**
 * Deserialize a raw DB hash into a Player object with correct types.
 */
function deserialize(raw) {
	const p = Object.assign({}, DEFAULTS, raw);
	p.cash          = parseFloat(p.cash)       || 0;
	p.level         = parseInt(p.level, 10)    || 1;
	p.xp            = parseInt(p.xp, 10)       || 0;
	p.skillpoints   = parseInt(p.skillpoints, 10) || 0;
	p.lastIncomeTick = parseInt(p.lastIncomeTick, 10) || 0;
	p.createdAt     = parseInt(p.createdAt, 10) || 0;

	// NodeBB stores arrays/objects as JSON strings
	if (typeof p.companies === 'string') {
		try { p.companies = JSON.parse(p.companies); } catch { p.companies = []; }
	}
	if (typeof p.holdings === 'string') {
		try { p.holdings = JSON.parse(p.holdings); } catch { p.holdings = {}; }
	}
	if (!Array.isArray(p.companies)) p.companies = [];
	if (typeof p.holdings !== 'object' || p.holdings === null) p.holdings = {};

	p.careerLabel = CAREER_LABELS[p.career] || p.career;
	return p;
}

/**
 * Serialize a Player object back to DB-safe flat hash.
 */
function serialize(player) {
	return {
		cash:           String(player.cash),
		level:          String(player.level),
		xp:             String(player.xp),
		career:         player.career,
		companies:      JSON.stringify(player.companies || []),
		holdings:       JSON.stringify(player.holdings  || {}),
		skillpoints:    String(player.skillpoints),
		lastIncomeTick: String(player.lastIncomeTick),
		createdAt:      String(player.createdAt || Date.now()),
	};
}

function createDefault() {
	return deserialize({ createdAt: Date.now() });
}

module.exports = { DEFAULTS, CAREER_LABELS, deserialize, serialize, createDefault };
