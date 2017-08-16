define(['agile-app'], function(Agile) {
    'use strict';

    return Agile.Command.extend({

		execute: function(data) {

            window.addEventListener('storage', Agile.bind(function(e) {
                this._onMessage(e);
            }, this), false);
		},

        _onMessage: function(e) {
            this.triggerToModule('storage:on:' + e.key, {
                value: e.newValue
            });
        }
	});
});
