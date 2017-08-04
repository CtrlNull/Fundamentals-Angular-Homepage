(function () {
    'use strict'

    angular
        .module('adminApp', [
            'ui.router',
            'adminApp.featureOne',
            'adminApp.featureTwo',
            'adminApp.routes'
        ]);

})();