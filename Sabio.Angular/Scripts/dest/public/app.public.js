
//app.public.js
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

//feature-four\modules.js
(function () {
    'use strict'

    angular
        .module('publicApp.featureFour', [])
        
})();

//feature-three\modules.js
(function () {
    angular
        .module('publicApp.featureThree', [])

})();

//routes\app.routes.js
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

//services\publicAppService.js
(function () {
    'use stric'
    //Test
    angular
        .module('publicApp')
        .factory('featureThreeService', FeatureThreeService);

    FeatureThreeService.$inject = ['$http','$q'];

    function FeatureThreeService($http, $q) {

        var sabioAuthKey = 'sabio-internal-00';
        return {
            getAll: _getAll,

        };

        function _getAll() {
            var settings = {
                url: 'http://sabioapi2.azurewebsites.net/api/blogs',
                method: 'GET',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
                .then(_getAllComplete, _getAllFailed);
        }

        function _getAllComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _getAllFailed(error) {
            var msg = 'Failed to retrieve blogs';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }
    }

})();

//feature-four\controllers\featureFourCtrl.js
(function () {
    angular
        .module('publicApp.featureFour')
        .controller('featureFourController', FeatureFourController);

    FeatureFourController.$inject = ['$scope'];

    function FeatureFourController($scope) {

    }

})();

//feature-three\controllers\featureThreeCtrl.js
(function () {
    angular
        .module('publicApp.featureThree')
        .controller('featureThreeController', FeatureThreeController);

    FeatureThreeController.$inject = ['$scope', 'featureThreeService'];

    function FeatureThreeController($scope, featureThreeService) {
        var vm = this;

        vm.featureThreeService = featureThreeService;
        vm.getAllSuccess = _getAllSuccess;
        vm.$onInit = _init;

        function _init() {
            vm.featureThreeService.getAll()
                .then(_getAllSuccess, _getAllError);
        }

        function _getAllSuccess(data) {
            vm.items = data.items
            console.log(data);
        }

        function _getAllError(error) {
            console.log(error);
        }

    }


})();