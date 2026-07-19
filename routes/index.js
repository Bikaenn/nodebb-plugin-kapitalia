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
	const auth = mw.ensureLoggedIn;

	router.get('/kapitalia', (req, res) => res.redirect('/kapitalia/dashboard'));

	router.get('/kapitalia/dashboard', auth, dashboard.render);
	router.get('/kapitalia/career',    auth, career.render);
	router.get('/kapitalia/market',    auth, market.render);
	router.get('/kapitalia/portfolio', auth, portfolio.render);
	router.get('/kapitalia/business',  auth, business.render);
	router.get('/kapitalia/missions',  auth, missions.render);
	router.get('/kapitalia/ranking',   auth, ranking.render);
};

exports.setupApiRoutes = async function (router, mw) {
	const auth = mw.ensureLoggedIn;

	router.post('/api/kapitalia/work/submit',  auth, workApi.submit);
	router.post('/api/kapitalia/market/buy',   auth, marketApi.buy);
	router.post('/api/kapitalia/market/sell',  auth, marketApi.sell);
	router.post('/api/kapitalia/business/buy', auth, businessApi.buy);
};
