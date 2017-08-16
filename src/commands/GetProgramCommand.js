define(['agile-app', '../components/deviceManager', 'config', '../components/streamMapOrden', '../components/streamTypeMap'], function(Agile, deviceManager, config, streamMapOrden, streamTypeMap) {
    'use strict';

	return Agile.EndpointCommand.extend({

        url: config.streamingsURL,

        method: 'GET',

        preventCache: true,

        _streamSize: 5,

        onSuccess: function(data, options, status, xhr) {
            options = options || {};

            this._diffWithClient = options.diffWithClient || this._diffWithClient;

            data = this._prepareData(data);

            var programData = {
                diffWithClient: this._diffWithClient,
                data: data
            };

            this.triggerToModule('init:stream:sources', this._setStreamSources(data));

            this.triggerToModule('init:scheduler:program', programData);
        },


        _prepareData: function(data) {
            var i = 0, l = data.length, streamMap = {}, orden;

            var dataResult = this._initProgramData();

            for (; i < l; i++) {
                orden = streamMapOrden[data[i].type];

                dataResult[orden - 1] = data[i];

                dataResult[orden - 1].orden = orden;
            }

            dataResult.sort(function(a, b) {
                return a.orden > b.orden;
            });

            return dataResult;
        },


        _initProgramData: function() {
            var data = [], i = 0, l = this._streamSize, orden;

            for (; i < l; i++) {
                orden = i + 1;
                data.push({
                    orden: orden,
                    type: streamTypeMap[orden],
                    broadcasts: []
                });
            }

            return data;
        },


        _checkVideoProgramType: function(data) {
            var programs = data.broadcasts, i = 0, l = programs.length;

            for (; i < l; i++) {
                if (programs[i].type === 'v') {
                    return true;
                }
            }

            return false;
        },


        _setStreamSources: function(data) {
            var key = 'url_web', i = 0, l = data.length, streamMap = {};

            key = 'url_streaming';

            for (; i < l; i++) {
                streamMap[i + 1] = data[i][key];
            }

            return streamMap;
        }
    });
});
