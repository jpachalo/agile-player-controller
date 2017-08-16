define(['agile-app'], function(Agile) {
    'use strict';

    return Agile.Singleton.extend(Agile.Events, {

        _TIMEOUT: 20000,

        _deviceTypes: {
            WPHONE  : 'wphone',
            IOS     : 'ios',
            ANDROID : 'android',
            WEB     : 'web'
        },

        initialize: function() {
            this._detectDeviceType();

            if (this.isMobile()) {
                this._checkSleepingApp();
            }
        },

        _checkSleepingApp: function() {
            var lastTime = (new Date()).getTime();

            setInterval(Agile.bind(function() {
                var currentTime = (new Date()).getTime();

                if (currentTime > (lastTime + this._TIMEOUT + 2000)) {
                    this.trigger('app:awake');
                }

                lastTime = currentTime;
            }, this), this._TIMEOUT);
        },


        _detectDeviceType: function() {
            if (this._isWindowsPhone()) {
                return this._deviceType = this._deviceTypes.WPHONE;
            }

            if (this._isIos()) {
                return this._deviceType = this._deviceTypes.IOS;
            }

            if (this._isAndroid()) {
                return this._deviceType = this._deviceTypes.ANDROID;
            }

            this._deviceType = this._deviceTypes.WEB;
        },


        isMobile: function() {
            var dType = this._deviceType;

            return (dType === this._deviceTypes.WPHONE || dType === this._deviceTypes.ANDROID || dType === this._deviceTypes.IOS);
        },


		_isIos: function() {
            return /(iPhone|iPad)/gi.test(navigator.userAgent);
        },


        _isAndroid: function() {
            return /Android/gi.test(navigator.userAgent);
        },


        _isWindowsPhone: function() {
            return /Windows\sPhone/gi.test(navigator.userAgent);
        },

        isIos: function() {
            return this._deviceType === this._deviceTypes.IOS;
        },

        isAndroid: function() {
            return this._deviceType === this._deviceTypes.ANDROID;
        },

        isWindowsPhone: function() {
            return this._deviceType === this._deviceTypes.WPHON;
        },

	}).getInstance();
});
