'use strict';

const db = nodebb.require('./src/database');
const PlayerService = require('./PlayerService');
const { COMPANIES, getById } = require('../models/Company');

async function seedCompanies() {
	// Companies are static definitions, no DB seed needed beyond the model
}

async function getAllCompanies() {
	return COMPANIES.map(c => ({ ...c }));
}

async function buy(uid, companyId) {
	const company = getById(companyId);
	if (!company) return { ok: false, message: 'Unternehmen nicht gefunden.' };

	const player = await PlayerService.getOrCreate(uid);
	if ((player.companies || []).includes(companyId)) {
		return { ok: false, message: 'Du besitzt dieses Unternehmen bereits.' };
	}

	const deduct = await PlayerService.deductCash(uid, company.price);
	if (!deduct.ok) return { ok: false, message: deduct.message };

	await PlayerService.addCompany(uid, companyId);

	return {
		ok: true,
		message: `„${company.name}" für ${company.price.toLocaleString('de-DE')} € gekauft! Du verdienst jetzt ${company.incomePerMinute} €/min passiv.`,
	};
}

module.exports = { seedCompanies, getAllCompanies, buy };
