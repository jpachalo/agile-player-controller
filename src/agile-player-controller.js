define([
    'agile-app',
    './controller/Controller',
    './views/AppLayout'
], function (Agile, MainController, AppLayout) {
    'use strict';

    return Agile.Module.extend({
        controller: MainController,
        layout: AppLayout
    });
});
