define(['agile-app', '../components/storageManager'], function(Agile, storageManager) {
    'use strict';

    return Agile.Command.extend({
		execute: function(data) {
            this.triggerToModule('player:state:retrieved', {
                display: storageManager.getPlayerState()
            });
		}
	});
});
