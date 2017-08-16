define(['agile-app', 'config'], function(Agile, config) {
    'use strict';

	return Agile.EndpointCommand.extend({

        url: config.serverLastDateURL,

        method: 'GET',

        preventCache: true,

        onSuccess: function(data, options, status, xhr) {

            if (this.__date !== data) {
                this.triggerToModule('get:server:data', {
                    force: true
                });
            }

            this.__date = data;
        }
    });
});
