define(['agile-app', '../components/deviceManager', 'config'], function(Agile, deviceManager, config) {
    'use strict';

	return Agile.EndpointCommand.extend({

        url: config.broadcastingsURL,

        method: 'GET',

        preventCache: true,

        onSuccess: function(data, options, status, xhr) {

            this.triggerToModule('init:station:sources', this._setStationSources(data));
        },


        _setStationSources: function(data) {
            var i = 0, l = data.length, stationMap = {};

            for (; i < l; i++) {
                stationMap[data[i].uid] = data[i].emisoras || [];
            }

            return stationMap;
        }
    });
});
