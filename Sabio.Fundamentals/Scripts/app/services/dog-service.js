(function () {
    "use strict";
    angular.module(APPNAME)
         .factory('dogService', dogService);

    dogService.$inject = ['$http', '$q'];

    function dogService($http, $q) {
        var sabioAuthKey = 'sabio-internal-00';
        return {
            getAll: _getAll,
            getById: _getById,
            post: _post,
            put: _put,
            delete: _delete
        };

        function _getAll() {
            var settings = {
                url: 'http://sabioapi2.azurewebsites.net/api/entities/dogs',
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
            var msg = 'Failed to retrieve dogs';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _getById(id) {
            var settings = {
                url: 'http://sabioapi2.azurewebsites.net/api/entities/dogs/' + id,
                method: 'GET',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
                .then(_getByIdComplete, _getByIdFailed);
        }

        function _getByIdComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _getByIdFailed(error) {
            var msg = 'Failed to retrieve dog';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _post(dog) {
            var settings = {
                url: 'http://sabioapi2.azurewebsites.net/api/entities/dogs',
                method: 'POST',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(dog)
            };
            return $http(settings)
                .then(_postComplete, _postFailed);
        }

        function _postComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _postFailed(error) {
            var msg = 'Failed to insert dog';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _put(dog) {
            var settings = {
                url: 'http://sabioapi2.azurewebsites.net/api/entities/dogs/' + dog.id,
                method: 'PUT',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                cache: false,
                responseType: 'json',
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(dog)
            };
            return $http(settings)
                .then(_putComplete, _putFailed);
        }

        function _putComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _putFailed(error) {
            var msg = 'Failed to update dog';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

        function _delete(id) {
            var settings = {
                url: 'http://sabioapi2.azurewebsites.net/api/entities/dogs/' + id,
                method: 'DELETE',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                cache: false,
                responseType: 'json'
            };
            return $http(settings)
                .then(_deleteComplete, _deleteFailed);
        }

        function _deleteComplete(response) {
            // unwrap the data from the response
            return response.data;
        }

        function _deleteFailed(error) {
            var msg = 'Failed to delete dog';
            if (error.data && error.data.description) {
                msg += '\n' + error.data.description;
            }
            error.data.description = msg;
            return $q.reject(error);
        }

    }

})();