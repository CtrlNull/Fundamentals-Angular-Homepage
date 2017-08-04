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