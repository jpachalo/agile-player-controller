define(['agile-app'], function(Agile) {
    'use strict';

    return Agile.Command.extend({

        _timeout: 60000,

		execute: function(data) {

            this.triggerToModule('get:last:server:modification');

            setInterval(Agile.bind(function() {
                this.triggerToModule('get:last:server:modification');
            }, this), this._timeout);
		},

        _onMessage: function(e) {
            this.triggerToModule('storage:on:' + e.key, {
                value: e.newValue
            });
        }
	});
});
