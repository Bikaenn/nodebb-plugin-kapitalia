'use strict';

const CAREER_STAGES = [
	{
		id: 'employee',
		label: 'Angestellter',
		minLevel: 1,
		minNetWorth: 0,
		unlockedTaskTypes: ['valuation'],
		description: 'Du arbeitest als Angestellter und bearbeitest einfache Finanzanalysen.',
		nextStage: 'freelancer',
		nextRequirements: { level: 5, netWorth: 3000 },
	},
	{
		id: 'freelancer',
		label: 'Selbstständiger',
		minLevel: 5,
		minNetWorth: 3000,
		unlockedTaskTypes: ['valuation', 'accounting'],
		description: 'Als Selbstständiger nimmst du komplexere Aufträge an.',
		nextStage: 'entrepreneur',
		nextRequirements: { level: 10, netWorth: 15000 },
	},
	{
		id: 'entrepreneur',
		label: 'Unternehmer',
		minLevel: 10,
		minNetWorth: 15000,
		unlockedTaskTypes: ['valuation', 'accounting', 'market_analysis'],
		description: 'Als Unternehmer analysierst du Märkte und leitest Investitionsentscheidungen.',
		nextStage: 'investor',
		nextRequirements: { level: 20, netWorth: 50000 },
	},
	{
		id: 'investor',
		label: 'Investor',
		minLevel: 20,
		minNetWorth: 50000,
		unlockedTaskTypes: ['valuation', 'accounting', 'market_analysis', 'purchase_decision'],
		description: 'Du verwaltest ein Portfolio und triffst strategische Kaufentscheidungen.',
		nextStage: 'mogul',
		nextRequirements: { level: 40, netWorth: 200000 },
	},
	{
		id: 'mogul',
		label: 'Finanzmogul',
		minLevel: 40,
		minNetWorth: 200000,
		unlockedTaskTypes: ['valuation', 'accounting', 'market_analysis', 'purchase_decision', 'management'],
		description: 'Du bist ein Finanzmogul – das Wirtschaftsimperium gehorcht dir.',
		nextStage: null,
		nextRequirements: null,
	},
];

function getStage(careerId) {
	return CAREER_STAGES.find(s => s.id === careerId) || CAREER_STAGES[0];
}

async function getInfo(careerId, level, netWorth) {
	const stage = getStage(careerId);
	let canPromote = false;
	let nextStage = null;

	if (stage.nextRequirements) {
		canPromote = level >= stage.nextRequirements.level && netWorth >= stage.nextRequirements.netWorth;
		nextStage = CAREER_STAGES.find(s => s.id === stage.nextStage) || null;
	}

	return { stage, canPromote, nextStage, allStages: CAREER_STAGES };
}

async function checkPromotion(uid, player) {
	const PlayerService = require('./PlayerService');
	const stage = getStage(player.career);
	if (!stage.nextRequirements) return false;

	const { level, netWorth } = player;
	if (level >= stage.nextRequirements.level && netWorth >= stage.nextRequirements.netWorth) {
		player.career = stage.nextStage;
		await PlayerService.save(uid, player);
		return true;
	}
	return false;
}

module.exports = { CAREER_STAGES, getStage, getInfo, checkPromotion };
