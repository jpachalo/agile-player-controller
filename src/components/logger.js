define(['agile-app', './storageManager'], function(Agile, storageManager) {
    'use strict';

    return Agile.Singleton.extend({

		_autoplayKey: 'autoplaycanal',

        _playerstateKey: 'playerstate',

        initialize: function() {
            this._debugMod  = storageManager.getDebugState();

            this._mapModule = storageManager.getLogModules();

            storageManager.getLogModules();
        },

        log: function(msg, moduleId) {
            this._log(msg, moduleId, console.log);
        },

        warn: function(msg, moduleId) {
            this._log(msg, moduleId, console.warn);
        },

        debug: function(msg, moduleId) {
            this._log(msg, moduleId, console.debug);
        },

        error: function(msg, moduleId) {
            this._log(msg, moduleId, console.error);
        },

        _log: function(msg, moduleId, fn) {
            if (!this._debugMod || !moduleId) {
                return false;
            }

            this._mapModule = this._mapModule || storageManager.getLogModules();

            if (this._checkModulesRules(moduleId)) {
                fn(msg);
            }
        },

        _getModulesRules: function() {
            return this._mapModule || storageManager.getLogModules() || [];
        },

        _checkModulesRules: function(moduleId) {
            var rules = this._getModulesRules(), i = 0, l = rules.length, reg;

            for (; i < l; i++) {
                reg = new RegExp(rules[i]);

                if (reg.test(moduleId)) {
                    return true;
                }
            }

            return false;
        }

	}).getInstance();
});
