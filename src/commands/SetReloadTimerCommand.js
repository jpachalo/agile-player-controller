define(['agile-app', '../components/storageManager'], function(Agile, storageManager) {
    'use strict';

    return Agile.Command.extend({

    	_timeout: 7200000,

		execute: function(data) {
			if (this._timer) {
				clearTimeout(this._timer);
			}

            this._timer = setTimeout(function() {
            	window.location.reload();
            }, this._timeout)
		}
	});
});
