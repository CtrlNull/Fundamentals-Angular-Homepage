(function () {
    angular.module("FormList")
        .factory("CallService", CallService);

    CallService.$inject = ["$http", "$q"];

    function CallService($http, $q) {
        //var svc = this;
        //svc.stack = [];
        //this.getAll = _getAll();
        
        return {getAll: _getAll}
        //// ----- { Settings } ------ ////

        //---- [POST] ---- // Settings
        function _getAll(data) {
            var settings = {
                url: "https://pacoima-ypi.azurewebsites.net/api/users/register/employer"
                , method: "POST"
                , cache: false
                , data: JSON.stringify(data)
                , dataType: "json"
            }
            return $http(settings)
                .then(_getAllSuccess, _getAllError)
        }
        // ---- [ Success ] ---- //
        function _getAllSuccess(response) {
            console.log("successfull");
            // unwrap the data from the response
            //return response.data;
        }
        // ---- [ Error ] ---- //
        function _getAllError(error) {
            return $q.reject(error);
        }
    }
})();