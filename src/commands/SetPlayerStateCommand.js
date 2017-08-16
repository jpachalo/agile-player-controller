define(['agile-app', '../components/storageManager'], function(Agile, storageManager) {
    'use strict';

    return Agile.Command.extend({
		execute: function(data) {
            storageManager.setPlayerState(data.display);

            storageManager.setAutoPlayCanal(data.canal);
		}
	});
});
