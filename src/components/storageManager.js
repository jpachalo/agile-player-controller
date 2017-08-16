define(['agile-app'], function(Agile) {
    'use strict';

    return Agile.Singleton.extend({

		_autoplayKey        : 'autoplaycanal',

        _playerstateKey     : 'playerstate',

        _debugstateKey      : 'debugstate',

        _streamsourcekey    : 'streamsource',

        _localStationKey    : 'localstation',

        _localStationUrlKey : 'localstationurl',

        initialize: function() {
            this._storage = localStorage;
            this._tmpStorage = sessionStorage;
        },

		setAutoPlayStream: function(stream) {
            this._storage.setItem(this._autoplayKey, stream);
            console.log(this._storage);
		},

        getAutoPlayStream: function () {
            return this._storage.getItem(this._autoplayKey);
        },

        getPlayerState: function() {
            return this._storage.getItem(this._playerstateKey);
        },

        setPlayerState: function(display) {
            this._storage.setItem(this._playerstateKey, display);
        },

        removeAutoPlayStream: function () {
            this._storage.removeItem(this._autoplayKey);
            console.log(this._storage);
        },

        _retrieveObject: function(key) {
            var item = this._storage.getItem(key);

            if (!item) {
                return item;
            }

            return JSON.parse(item);
        },

        setLocalStation: function(station) {
            if (!station) {
                return this._storage.removeItem(this._localStationKey);
            }

            this._storage.setItem(this._localStationKey, station);
        },


        getLocalStation: function() {
            return {
                1: this._storage.getItem(this._localStationKey)
            };
        },


        setLocalStreamUrl: function(stationUrl) {
            if (!stationUrl) {
                return this._storage.removeItem(this._localStationUrlKey);
            }

            this._storage.setItem(this._localStationUrlKey, stationUrl);
        },


        getLocalStreamUrl: function() {
            return {
                1: this._storage.getItem(this._localStationUrlKey)
            };
        },


        setPing: function(url) {
            console.log('set ping');
            this._storage.removeItem('pingpong');

            this._storage.setItem('pingpong', 'ping');

            if (url) {
                this._storage.removeItem('pingpongurl');
                this._storage.setItem('pingpongurl', url);
            }
        },


        setPong: function() {
            console.log('set pong');
            this._storage.setItem('pingpong', 'pong');
        },


        addStreamSource: function() {
            var store = this._retrieveObject(this._streamsourcekey) || [];
        },

        setWindow: function(win) {
            this._storage.setItem('extenalWindow', win);
        }

	}).getInstance();
});
