'use strict';

/**
 * Buchführungs-Aufgabe: Einfache Gewinn/Verlust-Berechnung
 */

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate() {
	const revenue  = randInt(50, 500) * 100;
	const costs    = randInt(30, 80) / 100 * revenue;
	const taxes    = Math.round(costs * 0.25);
	const profit   = Math.round(revenue - costs - taxes);

	// Generate plausible wrong answers
	const wrong1 = profit + randInt(500, 2000);
	const wrong2 = profit - randInt(500, 2000);
	const wrong3 = Math.round(revenue - costs); // forgetting taxes

	const options = [
		{ label: `${profit.toLocaleString('de-DE')} €`,  value: String(profit)  },
		{ label: `${wrong1.toLocaleString('de-DE')} €`,  value: String(wrong1)  },
		{ label: `${wrong2.toLocaleString('de-DE')} €`,  value: String(wrong2)  },
		{ label: `${wrong3.toLocaleString('de-DE')} €`,  value: String(wrong3)  },
	].sort(() => Math.random() - 0.5);

	return {
		question: `Ein Unternehmen hat Einnahmen von ${revenue.toLocaleString('de-DE')} €, Kosten von ${Math.round(costs).toLocaleString('de-DE')} € und zahlt 25 % Steuern auf den Rohgewinn. Wie hoch ist der Nettogewinn?`,
		options,
		answer: String(profit),
		context: {
			hint: 'Nettogewinn = Einnahmen − Kosten − Steuern. Steuern werden auf (Einnahmen − Kosten) berechnet.',
		},
		reward: { cash: 120, xp: 30, skillpoints: 0 },
	};
}

function check(task, answer) {
	const correct = String(answer).trim() === String(task.answer).trim();
	return {
		correct,
		message: correct
			? 'Richtig! Sehr gute Buchführungskenntnisse.'
			: `Falsch. Der korrekte Nettogewinn beträgt ${parseInt(task.answer).toLocaleString('de-DE')} €.`,
		reward: correct ? task.reward : null,
	};
}

module.exports = { generate, check };
