'use strict';

const PlayerService = require('./PlayerService');
const StockService  = require('./StockService');
const CompanyService = require('./CompanyService');
const LeaderboardService = require('./LeaderboardService');

async function applyPassiveIncome(uid) {
	const player = await PlayerService.getOrCreate(uid);
	const now = Date.now();
	const lastTick = player.lastIncomeTick || now;
	const minutesElapsed = Math.floor((now - lastTick) / 60000);

	if (minutesElapsed <= 0 || !player.companies || player.companies.length === 0) {
		return player;
	}

	const companies = await CompanyService.getAllCompanies();
	const ownedSet = new Set(player.companies);
	let incomeTotal = 0;

	for (const company of companies) {
		if (ownedSet.has(company.id)) {
			incomeTotal += company.incomePerMinute * minutesElapsed;
		}
	}

	if (incomeTotal > 0) {
		player.cash += incomeTotal;
		player.lastIncomeTick = now;
		await PlayerService.save(uid, player);
	}

	return player;
}

async function getSnapshot(uid) {
	// Apply lazy passive income first
	const player = await applyPassiveIncome(uid);

	// Calculate stock portfolio value
	const holdings = player.holdings || {};
	const symbols = Object.keys(holdings);
	let stockValue = 0;

	if (symbols.length > 0) {
		const stocks = await StockService.getBySymbols(symbols);
		for (const stock of stocks) {
			const qty = holdings[stock.symbol] || 0;
			stockValue += qty * stock.price;
		}
	}

	// Calculate company value
	const companies = await CompanyService.getAllCompanies();
	const ownedSet = new Set(player.companies || []);
	let companyValue = 0;
	let passiveIncome = 0;

	for (const company of companies) {
		if (ownedSet.has(company.id)) {
			companyValue += company.price; // Value = purchase price for simplicity
			passiveIncome += company.incomePerMinute;
		}
	}

	const investments = stockValue + companyValue;
	const netWorth = player.cash + investments;

	// Save netWorth on player for leaderboard
	player.netWorth = netWorth;
	await LeaderboardService.update(uid, netWorth);

	return {
		cash: player.cash,
		stockValue,
		companyValue,
		investments,
		netWorth,
		passiveIncome,
	};
}

module.exports = { applyPassiveIncome, getSnapshot };
