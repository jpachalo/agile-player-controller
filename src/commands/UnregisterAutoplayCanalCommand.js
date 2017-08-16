define(['agile-app', '../components/storageManager'], function(Agile, storageManager) {
    'use strict';

    return Agile.Command.extend(Agile.Events, {
		execute: function(data) {
            storageManager.removeAutoPlayStream();
		}
	});
});
