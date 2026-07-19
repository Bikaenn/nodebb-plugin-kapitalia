'use strict';

const db   = require.main.require('./src/database');
const User = require.main.require('./src/user');

const LEADERBOARD_KEY = 'kapitalia:players';

async function update(uid, netWorth) {
	await db.sortedSetAdd(LEADERBOARD_KEY, netWorth, String(uid));
}

async function getRank(uid) {
	// sortedSetRevRank returns 0-based rank from highest score
	const rank = await db.sortedSetRevRank(LEADERBOARD_KEY, String(uid));
	return rank === null ? null : rank + 1;
}

async function getTop(limit) {
	const uidsAndScores = await db.getSortedSetRevRangeWithScores(LEADERBOARD_KEY, 0, limit - 1);
	if (!uidsAndScores || uidsAndScores.length === 0) return [];

	const uids   = uidsAndScores.map(e => parseInt(e.value, 10));
	const scores = uidsAndScores.map(e => e.score);

	const users = await User.getUsersFields(uids, ['uid', 'username', 'userslug', 'picture']);

	return users.map((user, i) => ({
		rank:      i + 1,
		uid:       uids[i],
		username:  user ? user.username  : 'Unbekannt',
		userslug:  user ? user.userslug  : '',
		picture:   user ? user.picture   : '',
		netWorth:  scores[i],
	}));
}

module.exports = { update, getRank, getTop };
