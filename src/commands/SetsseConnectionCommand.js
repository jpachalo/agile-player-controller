define(['agile-app', 'config'], function(Agile, config) {
    'use strict';

    return Agile.Command.extend(Agile.Events, {

		_sseUrl: config.sseURL,

		execute: function(data) {
            /*this.listenTo(this.controller.vent, 'module::close', this.close);

            this._sse = new EventSource(this._sseUrl);

            this._sse.onmessage = Agile.bind(function(ev) {
                this.triggerToModule('retrieve:program', {
                    force: true
                });
            }, this);

            this._sse.onerror = function(ev) {
                console.warn('error :', ev);
            }*/
		},

        close: function() {
            if (this._sse) {
                this._sse.close();
            }

            this._sse = null;

            this.stopListen();
        },

        trigger: function (event, options) {
            this.controller.trigger(event, options);
        },

        triggerToModule: function(event, options) {
            this.controller.triggerToModule(event, options);
        }
	});
});
