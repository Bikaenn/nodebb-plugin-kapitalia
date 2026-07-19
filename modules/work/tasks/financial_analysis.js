'use strict';

/**
 * KGV (Kurs-Gewinn-Verhältnis) Vergleich – klassische Finanzanalyse-Aufgabe
 */

const COMPANIES = [
	{ name: 'TechNova AG',      kgv: 22 },
	{ name: 'GreenVolt GmbH',   kgv: 15 },
	{ name: 'EuroBank SE',      kgv: 11 },
	{ name: 'CloudSoft Corp',   kgv: 34 },
	{ name: 'AutoLux GmbH',     kgv: 8  },
	{ name: 'HealthOne AG',     kgv: 19 },
	{ name: 'FinAI Systems',    kgv: 41 },
	{ name: 'EnergyX SE',      kgv: 13 },
	{ name: 'RetailPro AG',     kgv: 17 },
	{ name: 'BioMed GmbH',     kgv: 26 },
];

function pickRandom(arr, n) {
	const shuffled = [...arr].sort(() => Math.random() - 0.5);
	return shuffled.slice(0, n);
}

function generate() {
	const selected = pickRandom(COMPANIES, 4);
	// Question: which has the lowest KGV? (most undervalued / cheapest relative to earnings)
	const lowest = selected.reduce((a, b) => a.kgv < b.kgv ? a : b);
	const options = selected.map(c => ({
		label: `${c.name} (KGV: ${c.kgv})`,
		value: c.name,
	}));
	// Shuffle options
	options.sort(() => Math.random() - 0.5);

	return {
		question: 'Welche Aktie hat das niedrigste Kurs-Gewinn-Verhältnis (KGV) und gilt damit als am günstigsten bewertet?',
		options,
		answer: lowest.name,
		context: {
			hint: 'Ein niedrigeres KGV bedeutet, dass du weniger für jeden Euro Unternehmensgewinn zahlst.',
		},
		reward: { cash: 80, xp: 20, skillpoints: 0 },
	};
}

function check(task, answer) {
	const correct = String(answer).trim() === String(task.answer).trim();
	return {
		correct,
		message: correct
			? `Richtig! ${task.answer} hat das niedrigste KGV und ist relativ günstig bewertet.`
			: `Falsch. Die richtige Antwort war: ${task.answer}.`,
		reward: correct ? task.reward : null,
	};
}

module.exports = { generate, check };
