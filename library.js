'use strict';

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');

const routes = require('./routes');
const PlayerService = require('./services/PlayerService');
const StockEngine = require('./modules/stocks/StockEngine');
const EventBus = require('./modules/events/EventBus');

const Plugin = module.exports;

Plugin.init = async function (params) {
	const { router, middleware } = params;
	winston.info('[Kapitalia] Initializing plugin routes');

	try {
		await routes.setupPageRoutes(router, middleware);
		await routes.setupApiRoutes(router, middleware);
		winston.info('[Kapitalia] Routes registered successfully');
	} catch (e) {
		winston.error('[Kapitalia] Failed to register routes:', e);
		return;
	}

	if (nconf.get('runJobs')) {
		winston.info('[Kapitalia] Starting background jobs (this instance runs jobs)');
		const stockTick = require('./jobs/stockTick');
		const incomeTick = require('./jobs/incomeTick');
		stockTick.start();
		incomeTick.start();
	} else {
		winston.info('[Kapitalia] Skipping jobs (runJobs not set)');
	}
};

Plugin.addApiRoutes = async function (params) {
	// intentionally empty — API routes are registered in init via static:app.load
};

Plugin.addProfileData = async function (hookData) {
	const { uid } = hookData.templateData;
	if (!uid) return hookData;

	try {
		const LeaderboardService = require('./services/LeaderboardService');
		const EconomyService = require('./services/EconomyService');
		const player = await PlayerService.getOrCreate(uid);
		const rank = await LeaderboardService.getRank(uid);
		const economy = await EconomyService.getSnapshot(uid);

		hookData.templateData.kapitalia = {
			level: player.level,
			career: player.career,
			netWorth: economy.netWorth,
			stockValue: economy.investments,
			passiveIncome: economy.passiveIncome,
			rank,
		};
	} catch (e) {
		winston.error('[Kapitalia] addProfileData error:', e);
	}

	return hookData;
};

Plugin.addAdminNavigation = async function (custom_header) {
	custom_header.plugins.push({
		route: '/plugins/kapitalia',
		icon: 'fa-chart-line',
		name: 'Kapitalia',
	});
	return custom_header;
};

Plugin.onPostSave = async function (data) {
	// Stub for v0.2 Forum-XP integration
	// EventBus.emit('forum.post.created', { uid: data.post.uid, postId: data.post.pid, quality: 1 });
	return data;
};

// Called once when the plugin is activated via ACP
Plugin.onActivation = async function () {
	winston.info('[Kapitalia] Seeding initial data...');
	try {
		const StockService = require('./services/StockService');
		const CompanyService = require('./services/CompanyService');
		const MissionService = require('./services/MissionService');
		await StockEngine.seedStocks();
		await CompanyService.seedCompanies();
		await MissionService.seedMissions();
		winston.info('[Kapitalia] Seed complete');
	} catch (e) {
		winston.error('[Kapitalia] Seed error:', e);
	}
};
