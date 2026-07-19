'use strict';

const cron    = require('node-cron');
const winston = require.main.require('winston');
const db      = require.main.require('./src/database');
const StockEngine = require('../modules/stocks/StockEngine');

let job = null;

function start() {
	if (job) return;

	// Run every 5 minutes
	job = cron.schedule('*/5 * * * *', async () => {
		try {
			await StockEngine.tick();
			await db.setObjectField('kapitalia:meta', 'lastStockTick', String(Date.now()));
			winston.verbose('[Kapitalia] stockTick complete');
		} catch (e) {
			winston.error('[Kapitalia] stockTick error:', e);
		}
	});

	winston.info('[Kapitalia] stockTick job started (every 5 minutes)');
}

function stop() {
	if (job) {
		job.destroy();
		job = null;
		winston.info('[Kapitalia] stockTick job stopped');
	}
}

module.exports = { start, stop };
