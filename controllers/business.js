'use strict';

const winston = nodebb.require('winston');
const PlayerService  = require('../services/PlayerService');
const CompanyService = require('../services/CompanyService');
const EconomyService = require('../services/EconomyService');

exports.render = async function (req, res) {
	try {
		const uid = req.uid;
		const player    = await PlayerService.getOrCreate(uid);
		const companies = await CompanyService.getAllCompanies();
		const economy   = await EconomyService.getSnapshot(uid);
		const flash     = req.session.kapitaliaFlash || null;
		delete req.session.kapitaliaFlash;

		// Mark which companies the player already owns
		const ownedSet = new Set(player.companies || []);
		const companiesWithOwnership = companies.map(c => ({
			...c,
			owned: ownedSet.has(c.id),
			affordable: Number(player.cash) >= Number(c.price),
		}));

		res.render('kapitalia/business', {
			title: 'Kapitalia – Unternehmen',
			player,
			companies: companiesWithOwnership,
			economy,
			flash,
			breadcrumbs: [{ text: 'Kapitalia', url: '/kapitalia' }, { text: 'Unternehmen' }],
		});
	} catch (e) {
		winston.error('[Kapitalia] business error:', e);
		res.status(500).send('Interner Fehler');
	}
};
