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
	// buildHeader sets up the NodeBB page frame (navigation, user session, theme).
	// ensureLoggedIn redirects anonymous visitors to the login page.
	const pageMiddleware = [mw.buildHeader, mw.ensureLoggedIn];

	router.get('/kapitalia', (req, res) => res.redirect('/kapitalia/dashboard'));

	router.get('/kapitalia/dashboard', pageMiddleware, dashboard.render);
	router.get('/kapitalia/career',    pageMiddleware, career.render);
	router.get('/kapitalia/market',    pageMiddleware, market.render);
	router.get('/kapitalia/portfolio', pageMiddleware, portfolio.render);
	router.get('/kapitalia/business',  pageMiddleware, business.render);
	router.get('/kapitalia/missions',  pageMiddleware, missions.render);
	router.get('/kapitalia/ranking',   pageMiddleware, ranking.render);
};

exports.setupApiRoutes = async function (router, mw) {
	const auth = mw.ensureLoggedIn;

	router.post('/api/kapitalia/work/submit',  auth, workApi.submit);
	router.post('/api/kapitalia/market/buy',   auth, marketApi.buy);
	router.post('/api/kapitalia/market/sell',  auth, marketApi.sell);
	router.post('/api/kapitalia/business/buy', auth, businessApi.buy);
};
