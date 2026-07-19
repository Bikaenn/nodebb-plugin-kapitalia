'use strict';

const winston = require.main.require('winston');
const CompanyService = require('../../services/CompanyService');
const MissionService = require('../../services/MissionService');

exports.buy = async function (req, res) {
	try {
		const uid = req.uid;
		const { companyId } = req.body;

		if (!companyId) {
			req.session.kapitaliaFlash = { type: 'danger', message: 'Ungültige Eingabe.' };
			return res.redirect('/kapitalia/business');
		}

		const result = await CompanyService.buy(uid, companyId);
		if (!result.ok) {
			req.session.kapitaliaFlash = { type: 'danger', message: result.message };
		} else {
			req.session.kapitaliaFlash = { type: 'success', message: result.message };
			await MissionService.check(uid, 'company_buy');
		}
		return res.redirect('/kapitalia/business');
	} catch (e) {
		winston.error('[Kapitalia] business buy error:', e);
		req.session.kapitaliaFlash = { type: 'danger', message: 'Interner Fehler.' };
		return res.redirect('/kapitalia/business');
	}
};
