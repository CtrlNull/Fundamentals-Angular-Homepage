(function () {
    'use strict'

    angular
        .module('publicApp', [
            'ui.router',
            'publicApp.featureThree',
            'publicApp.featureFour',
            'publicApp.routes'
        ]);

})();