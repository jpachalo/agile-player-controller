define(['agile-app', '../components/storageManager'], function(Agile, storageManager) {
    'use strict';

	return Agile.View.extend({

		bindedTo: '[data-selector="local-station"]',

        moduleEvents: {
            'init:station:sources'  : '_onStationRetrieve',
            'toggle:station:view'   : '_onToggleStationView',
        },

        events: {
            'change select[data-selector="region-combo"]': '_onStationRegionChange',
            'change select[data-selector="station-combo"]': '_onStationChange'
        },

        ui: {
            'regionCombo': 'select[data-selector="region-combo"]',
            'stationCombo': 'select[data-selector="station-combo"]',
            'listenLink': 'a[data-selector="listen-link"]',
            'contentLink': 'a[data-selector="content-link"]'
        },

		onBinding: function() {
            this.trigger('module:get:local:station');
            this._isDisplayed = false;
		},


        _onStationRetrieve: function(data) {
            this._stationMap = data;
        },


        _onStationRegionChange: function() {
            var uid = this.ui.regionCombo.val();

            this._fillStationCombo(this._stationMap[uid]);
        },

        _onStationChange: function() {
            var uid, id, data, i = 0, l;

            uid = this.ui.regionCombo.val();

            id = this.ui.stationCombo.val();

            data = this._stationMap[uid];

            if (id) {
                id = parseInt(id, 10);
            }

            for (l = data.length; i < l; i++) {
                if (id === data[i].id) {
                    return this._setLinks(data[i]);
                }
            }

            this._hideLinks();
        },

        _fillStationCombo: function(data) {
            var i = 0, l = data.length, option;

            this.ui.stationCombo.empty();


            for (; i < l; i++) {
                option = $('<option></option>').attr('value', data[i].id).text(data[i].name);

                this.ui.stationCombo.append(option);
            }

            this._onStationChange();
        },


        _hideLinks: function() {
            this.ui.contentLink.hide();
            this.ui.listenLink.hide();
        },


        _setLinks: function(data) {

            if (!data.contentUrl) {
                this.ui.contentLink.hide();
            } else {
                this.ui.contentLink.show();
                this.ui.contentLink.attr('href', data.contentUrl);
            }

            if (!data.streamings || !data.streamings[0] || !data.streamings[0].url_streaming) {
                this.ui.listenLink.hide();
            } else {
                this.ui.listenLink.show();
                this.ui.listenLink.attr('href', data.streamings[0].url_streaming);
            }
        },


        _onToggleStationView: function() {
            if (!this._isDisplayed) {
                this._isDisplayed = true;
                this.$el.show();
            } else {
                this._isDisplayed = false;
                this.$el.hide();
            }
        }
	});
});
