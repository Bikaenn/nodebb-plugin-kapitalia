'use strict';

const db = require.main.require('./src/database');
const { deserialize, serialize, createDefault } = require('../models/Player');
const LeaderboardService = require('./LeaderboardService');

const KEY = uid => `kapitalia:player:${uid}`;

async function getOrCreate(uid) {
	let raw = await db.getObject(KEY(uid));
	if (!raw || !raw.createdAt) {
		const defaults = createDefault();
		await db.setObject(KEY(uid), serialize(defaults));
		raw = await db.getObject(KEY(uid));
	}
	return deserialize(raw);
}

async function get(uid) {
	const raw = await db.getObject(KEY(uid));
	return raw ? deserialize(raw) : null;
}

async function save(uid, player) {
	await db.setObject(KEY(uid), serialize(player));
	// Update leaderboard whenever the player is saved (netWorth may have changed)
	if (player.netWorth !== undefined) {
		await LeaderboardService.update(uid, player.netWorth);
	}
}

async function addCash(uid, amount) {
	const player = await getOrCreate(uid);
	player.cash = Math.max(0, player.cash + amount);
	await save(uid, player);
	return player;
}

async function deductCash(uid, amount) {
	const player = await getOrCreate(uid);
	if (player.cash < amount) return { ok: false, message: 'Nicht genug Guthaben.' };
	player.cash -= amount;
	await save(uid, player);
	return { ok: true, player };
}

async function addXP(uid, amount) {
	const player = await getOrCreate(uid);
	player.xp += amount;
	const xpNeeded = player.level * 100;
	if (player.xp >= xpNeeded) {
		player.xp -= xpNeeded;
		player.level += 1;
		player.skillpoints += 1;
	}
	await save(uid, player);
	return player;
}

async function addSkillpoints(uid, amount) {
	const player = await getOrCreate(uid);
	player.skillpoints = (player.skillpoints || 0) + amount;
	await save(uid, player);
	return player;
}

async function addCompany(uid, companyId) {
	const player = await getOrCreate(uid);
	if (!player.companies.includes(companyId)) {
		player.companies.push(companyId);
		await save(uid, player);
	}
	return player;
}

async function updateHolding(uid, symbol, qty) {
	const player = await getOrCreate(uid);
	if (qty <= 0) {
		delete player.holdings[symbol];
	} else {
		player.holdings[symbol] = qty;
	}
	await save(uid, player);
	return player;
}

module.exports = { getOrCreate, get, save, addCash, deductCash, addXP, addSkillpoints, addCompany, updateHolding };
