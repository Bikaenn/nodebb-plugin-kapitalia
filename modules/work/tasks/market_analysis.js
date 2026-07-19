'use strict';

/**
 * Marktanalyse-Aufgabe: Trend-Erkennung und Portfoliostrategie
 */

const SCENARIOS = [
	{
		question: 'Die Inflation steigt auf 8 %, die Zentralbank erhöht die Zinsen. Welche Anlagestrategie ist in diesem Umfeld sinnvoll?',
		options: [
			{ label: 'Anleihen kaufen (sichere Zinsen)', value: 'bonds' },
			{ label: 'Rohstoffe und inflationsgeschützte Wertpapiere kaufen', value: 'commodities' },
			{ label: 'Alles in Wachstumsaktien investieren', value: 'growth' },
			{ label: 'Bargeld horten', value: 'cash' },
		],
		answer: 'commodities',
		explanation: 'Rohstoffe und inflationsgeschützte Papiere behalten bei hoher Inflation ihren Wert. Anleihen verlieren bei steigenden Zinsen an Wert; Wachstumsaktien sind besonders zinsempfindlich.',
	},
	{
		question: 'Eine Aktie hat 3 Quartale in Folge sinkende Gewinne bei steigendem Umsatz gemeldet. Was deutet das wahrscheinlich an?',
		options: [
			{ label: 'Starke Wachstumsphase – sofort kaufen', value: 'buy' },
			{ label: 'Steigende Kosten fressen den Gewinn – Vorsicht geboten', value: 'caution' },
			{ label: 'Kurz vor Insolvenz – sofort verkaufen', value: 'sell' },
			{ label: 'Normale Saisonschwankungen', value: 'seasonal' },
		],
		answer: 'caution',
		explanation: 'Sinkende Margen bei steigendem Umsatz weisen auf steigende Kosten hin. Das erfordert weitere Analyse, nicht blindes Kaufen oder Panikverkaufen.',
	},
	{
		question: 'Der Technologiesektor bricht um 15 % ein. Du hast 60 % deines Portfolios in Tech-Aktien. Was ist die klügste Reaktion?',
		options: [
			{ label: 'Sofort alles verkaufen, um Verluste zu begrenzen', value: 'sell_all' },
			{ label: 'Portfolio diversifizieren und Übergewichtung reduzieren', value: 'diversify' },
			{ label: 'Mehr Tech-Aktien kaufen (Buy the dip)', value: 'buy_more' },
			{ label: 'Nichts tun und warten', value: 'wait' },
		],
		answer: 'diversify',
		explanation: 'Eine Übergewichtung in einem Sektor ist ein Risikofaktor. Diversifikation reduziert das Klumpenrisiko – unabhängig davon, ob der Markt steigt oder fällt.',
	},
];

function generate() {
	const scenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
	const options = [...scenario.options].sort(() => Math.random() - 0.5);

	return {
		question: scenario.question,
		options,
		answer: scenario.answer,
		context: { hint: scenario.explanation },
		reward: { cash: 180, xp: 45, skillpoints: 1 },
	};
}

function check(task, answer) {
	const correct = String(answer).trim() === String(task.answer).trim();
	return {
		correct,
		message: correct
			? `Ausgezeichnet! ${task.context.hint}`
			: `Nicht ganz richtig. ${task.context.hint}`,
		reward: correct ? task.reward : null,
	};
}

module.exports = { generate, check };
