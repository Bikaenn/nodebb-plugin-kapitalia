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

exports.setupPageRoutes = async function (router, mw) {
	// helpers.setupPageRoute registers BOTH:
	//   GET /kapitalia/dashboard        (direct browser navigation, full HTML)
	//   GET /api/kapitalia/dashboard    (ajaxify AJAX request, JSON response)
	// Without the /api/* route NodeBB's ajaxify shows "page not found" even
	// though the direct route works.
	const helpers = require.main.require('./src/routes/helpers');
	const auth = [mw.ensureLoggedIn];

	router.get('/kapitalia', (req, res) => res.redirect('/kapitalia/dashboard'));

	helpers.setupPageRoute(router, '/kapitalia/dashboard', auth, dashboard.render);
	helpers.setupPageRoute(router, '/kapitalia/career',    auth, career.render);
	helpers.setupPageRoute(router, '/kapitalia/market',    auth, market.render);
	helpers.setupPageRoute(router, '/kapitalia/portfolio', auth, portfolio.render);
	helpers.setupPageRoute(router, '/kapitalia/business',  auth, business.render);
	helpers.setupPageRoute(router, '/kapitalia/missions',  auth, missions.render);
	helpers.setupPageRoute(router, '/kapitalia/ranking',   auth, ranking.render);
};

exports.setupApiRoutes = async function (router, mw) {
	const auth = mw.ensureLoggedIn;

	router.post('/api/kapitalia/work/submit',  auth, workApi.submit);
	router.post('/api/kapitalia/market/buy',   auth, marketApi.buy);
	router.post('/api/kapitalia/market/sell',  auth, marketApi.sell);
	router.post('/api/kapitalia/business/buy', auth, businessApi.buy);
};
