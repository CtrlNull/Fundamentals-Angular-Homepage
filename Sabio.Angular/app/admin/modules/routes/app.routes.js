(function () {
    'use strict';

    var app = angular.module('adminApp.routes', []);
    app.config(_configureStates);

    _configureStates.$inject = ['$stateProvider', '$locationProvider'];

    function _configureStates($stateProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });


        $stateProvider
            .state({
                name: 'featureOne',
                url: '/admin/featureOne',
                templateUrl: '/app/admin/modules/feature-one/featureOne.html',
                title: 'Feature One',
                controller: 'featureOneController as f'

            })
            .state({
                name: 'featureTwo',
                component: 'featureTwo',
                url: '/admin/featureTwo',
                templateUrl: '/app/admin/modules/feature-two/featureTwo.html'
            });
    }

})();