define(['agile-app'], function(Agile) {
    'use strict';

	return Agile.View.extend({

		bindedTo: '[data-selector="playlist"]',

		onBinding: function() {
			console.log('init playlist');
		}
	});
});
