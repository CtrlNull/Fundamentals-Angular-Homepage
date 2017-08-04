(function () {
    'use strict';


    var app = angular.module('publicApp.routes', []);
    app.config(_configureStates);

    _configureStates.$inject = ['$stateProvider', '$locationProvider'];

    function _configureStates($stateProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider
            .state({
                name: 'featureThree',
                url: '/featureThree',
                templateUrl: '/app/public/modules/feature-three/featureThree.html',
                title: 'Feature Three',
                controller: 'featureThreeController as f'

            })
            .state({
                name: 'featureFour',
                url: '/featureFour',
                templateUrl: '/app/public/modules/feature-four/featureFour.html',
                title: 'Feature Four'
            });
    }

})();