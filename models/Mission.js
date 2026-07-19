'use strict';

const SEED_MISSIONS = [
	{
		id: 'first_work',
		title: 'Erste Schritte',
		description: 'Löse deine erste Arbeitsaufgabe.',
		event: 'work_complete',
		targetCount: 1,
		rewardCash: 200,
		rewardXP: 50,
	},
	{
		id: 'first_stock',
		title: 'Börsendebüt',
		description: 'Kaufe deine erste Aktie.',
		event: 'stock_buy',
		targetCount: 1,
		rewardCash: 300,
		rewardXP: 75,
	},
	{
		id: 'first_company',
		title: 'Unternehmer',
		description: 'Kaufe dein erstes Unternehmen.',
		event: 'company_buy',
		targetCount: 1,
		rewardCash: 500,
		rewardXP: 100,
	},
	{
		id: 'net_worth_5000',
		title: 'Aufsteiger',
		description: 'Erreiche ein Gesamtvermögen von 5.000 €.',
		event: 'net_worth_check',
		targetAmount: 5000,
		rewardCash: 1000,
		rewardXP: 200,
	},
];

function deserializeProgress(raw) {
	return {
		status:   raw.status || 'active',
		progress: parseInt(raw.progress, 10) || 0,
	};
}

module.exports = { SEED_MISSIONS, deserializeProgress };
