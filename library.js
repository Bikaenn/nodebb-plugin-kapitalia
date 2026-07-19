'use strict';

const Plugin = module.exports;

Plugin.init = async function (params) {
	const { router, middleware } = params;
	console.log('[Kapitalia] init() called — plugin is loading');

	try {
		const routes = require('./routes');
		await routes.setupPageRoutes(router, middleware);
		await routes.setupApiRoutes(router, middleware);
		console.log('[Kapitalia] all routes registered successfully');
	} catch (e) {
		console.error('[Kapitalia] ROUTE SETUP FAILED:', e.message);
		console.error(e.stack);
	}

	try {
		const nconf = require('nconf');
		if (nconf.get('runJobs')) {
			const stockTick = require('./jobs/stockTick');
			const incomeTick = require('./jobs/incomeTick');
			stockTick.start();
			incomeTick.start();
			console.log('[Kapitalia] background jobs started');
		}
	} catch (e) {
		console.error('[Kapitalia] JOBS SETUP FAILED:', e.message);
	}
};

Plugin.addProfileData = async function (hookData) {
	const { uid } = hookData.templateData;
	if (!uid) return hookData;
	try {
		const LeaderboardService = require('./services/LeaderboardService');
		const EconomyService     = require('./services/EconomyService');
		const PlayerService      = require('./services/PlayerService');
		const player = await PlayerService.getOrCreate(uid);
		const rank   = await LeaderboardService.getRank(uid);
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
		console.error('[Kapitalia] addProfileData error:', e.message);
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
	return data;
};

Plugin.addApiRoutes = async function (params) {
	// intentionally empty — API routes are registered in init
};
