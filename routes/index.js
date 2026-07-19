'use strict';

const dashboard  = require('../controllers/dashboard');
const career     = require('../controllers/career');
const market     = require('../controllers/market');
const portfolio  = require('../controllers/portfolio');
const business   = require('../controllers/business');
const missions   = require('../controllers/missions');
const ranking    = require('../controllers/ranking');

const workApi     = require('../controllers/api/work');
const marketApi   = require('../controllers/api/market');
const businessApi = require('../controllers/api/business');

// Mirrors the pattern used by nodebb-plugin-custom-pages:
// - registers both /path and /api/path so ajaxify works
// - sets res.locals.isAPI so NodeBB knows whether to wrap in full HTML or return JSON
// - runs the NodeBB middleware chain manually (buildHeader for direct, skip for API)
function runMiddlewares(middlewares, req, res) {
	return new Promise((resolve, reject) => {
		let i = 0;
		function next(err) {
			if (err) return reject(err);
			if (i >= middlewares.length) return resolve();
			const mw = middlewares[i++];
			try { mw(req, res, next); } catch (e) { reject(e); }
		}
		next();
	});
}

function makePageHandler(mw, controller) {
	return async function (req, res, next) {
		try {
			res.locals.isAPI = req.path.startsWith('/api');

			let middlewares = [
				mw.maintenanceMode,
				mw.registrationComplete,
				mw.pageView,
				mw.pluginHooks,
			].filter(Boolean);

			if (!res.locals.isAPI) {
				middlewares = [
					mw.busyCheck,
					mw.applyCSRF,
					mw.buildHeader,
				].concat(middlewares).filter(Boolean);
			}

			await runMiddlewares(middlewares, req, res);
			await controller(req, res, next);
		} catch (err) {
			next(err);
		}
	};
}

exports.setupPageRoutes = async function (router, mw) {
	const auth = mw.ensureLoggedIn;

	router.get('/kapitalia', (req, res) => res.redirect('/kapitalia/dashboard'));

	const pages = [
		['/kapitalia/dashboard', dashboard.render],
		['/kapitalia/career',    career.render],
		['/kapitalia/market',    market.render],
		['/kapitalia/portfolio', portfolio.render],
		['/kapitalia/business',  business.render],
		['/kapitalia/missions',  missions.render],
		['/kapitalia/ranking',   ranking.render],
	];

	for (const [path, controller] of pages) {
		const handler = makePageHandler(mw, controller);
		// Direct navigation (full HTML page)
		router.get(path, auth, handler);
		// Ajaxify navigation (JSON response, NodeBB client renders it)
		router.get('/api' + path, auth, handler);
	}
};

exports.setupApiRoutes = async function (router, mw) {
	const auth = mw.ensureLoggedIn;

	router.post('/api/kapitalia/work/submit',  auth, workApi.submit);
	router.post('/api/kapitalia/market/buy',   auth, marketApi.buy);
	router.post('/api/kapitalia/market/sell',  auth, marketApi.sell);
	router.post('/api/kapitalia/business/buy', auth, businessApi.buy);
};
