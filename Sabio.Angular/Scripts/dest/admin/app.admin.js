
//app.admin.js
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

//feature-two\modules.js
(function () {
    angular
        .module('adminApp.featureTwo', [])
   
})();

//feature-one\modules.js
(function () {
    angular
        .module('adminApp.featureOne', [])

})();

//routes\app.routes.js
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

//services\demoAppService.js
(function () {
    'use stric'
    angular
        .module('adminApp')
        .factory('featureOneService', FeatureOneService);

    FeatureOneService.$inject = ['$http',"$q"];

    function FeatureOneService($http, $q) {
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

//feature-two\controllers\featureTwoCtrl.js
(function () {

    'use strict';
    angular
        .module('adminApp.featureTwo')
        .controller('featureTwoController', FeatureTwoController);

    FeatureTwoController.$inject = ['$scope'];

    function FeatureTwoController($scope) {

    }

})();



//feature-one\controllers\featureOneCtrl.js
(function () {
    angular
        .module('adminApp.featureOne')
        .controller('featureOneController', FeatureOneController);

    FeatureOneController.$inject = ['$scope', 'featureOneService'];

    function FeatureOneController($scope, featureOneService) {
        var vm = this;

        vm.featureOneService = featureOneService;
        vm.getAllSuccess = _getAllSuccess;
        vm.$onInit = _init;

        function _init() {
            vm.featureOneService.getAll()
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