define(['agile-app', '../components/storageManager'], function(Agile, storageManager) {
    'use strict';

    return Agile.Command.extend({
		execute: function(data) {
            storageManager.setAutoPlayStream(data.stream);
		}
	});
});
