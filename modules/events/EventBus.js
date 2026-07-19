'use strict';

const EventEmitter = require('events');
const bus = new EventEmitter();
bus.setMaxListeners(50);

/**
 * EventBus – zentrale Event-Verteilung zwischen Modulen.
 *
 * v0.1: Architektur-Stub. Listener sind registriert aber leer.
 * v0.2: XP für Forum-Posts, Community-Events, Investment-Clubs.
 */

// Stub-Listener: Forum-Post erstellt
bus.on('forum.post.created', (data) => {
	// TODO v0.2: XP vergeben basierend auf Post-Qualität
	// PlayerService.addXP(data.uid, calculateForumXP(data.quality));
});

// Stub-Listener: Investment-Club-Event
bus.on('investment.club.event', (data) => {
	// TODO v0.2: Gruppenbonus verteilen
});

// Stub-Listener: Community-Event
bus.on('community.event', (data) => {
	// TODO v0.2: Event-Belohnungen verteilen
});

module.exports = bus;
