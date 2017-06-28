(function () {
    "use strict";
    angular.module('mainApp')
         .factory('blogService', BlogService);

    BlogService.$inject = ['$http'];

    function BlogService($http) {
        var sabioAuthKey = 'sabio-internal-00';
        var svc = {};

        // Public methods - All return a JavaScript promise
        svc.getAll = _getAll;
        svc.getById = _getById;
        svc.post = _post;
        svc.put = _put;
        svc.delete = _delete;

        // Begin "private" functions

        function _getAll() {
            var settings = {
                url: 'https://sabioapi2.azurewebsites.net/api/blogs',
                method: 'GET',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                xhrFields: { withCredentials: true },
                cache: false,
                responseType: 'json'
            };
            return $http(settings);
        }

        function _getById(id) {
            var settings = {
                url: 'https://sabioapi2.azurewebsites.net/api/blogs/' + id,
                method: 'GET',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                xhrFields: { withCredentials: true },
                cache: false,
                responseType: 'json'
            };
            return $http(settings);
        }

        function _post(blog) {
            var settings = {
                url: 'https://sabioapi2.azurewebsites.net/api/blogs',
                method: 'POST',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                xhrFields: { withCredentials: true },
                cache: false,
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(blog)
            };
            return $http(settings);
        }

        function _put(blog) {
            var settings = {
                url: 'https://sabioapi2.azurewebsites.net/api/blogs/' + blog.id,
                method: 'PUT',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                xhrFields: { withCredentials: true },
                cache: false,
                responseType: 'json',
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(blog)
            };
            return $http(settings);
        }

        function _delete(id) {
            var settings = {
                url: 'https://sabioapi2.azurewebsites.net/api/blogs/' + blog.id,
                method: 'DELETE',
                headers: { 'SABIO-AUTH': sabioAuthKey },
                xhrFields: { withCredentials: true },
                cache: false,
                responseType: 'json'
            };
            return $http(settings);
        }

        return svc;
    }

})();