define(['agile-app'], function(Agile) {
    'use strict';

	return Agile.View.extend({

		bindedTo: '[data-selector="sticky-view"]',

		ui: {
			boton	: 'span[data-selector="sticky-button"]'
		},

		moduleEvents: {
			'player:opened': '_onPlayerOpened',
			'player:closed': '_onPlayerClosed'
		},

		events: {
			'click [data-selector="sticky-button"]': '_triggerTogglePlayer'
		},

		_onBinding: function() {
			this.ui.boton.hide();
		},

		_onPlayerOpened: function() {
			this.ui.boton.addClass('open');
		},

		_onPlayerClosed: function() {
			this.ui.boton.removeClass('open');
		},

		_triggerTogglePlayer: function(data) {
			this.trigger('module:toggle:player');
		}
	});
});
