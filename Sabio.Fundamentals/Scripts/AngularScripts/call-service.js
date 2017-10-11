(function () {
    angular.module("FormList")
        .factory("CallService", CallService);

    CallService.$inject = ["$http", "$q"];

    function CallService($http, $q) {
        //// ======================== { Settings } =========================== ////
        //-------------- [POST] ---------------- //
        function _post(data) {
            var settings = {
                url: "https://pacoima-ypi.azurewebsites.net/api/users/register/employer"
                , method: "POST"
                , cache: false
                , data: JSON.stringify(data)
                , contentType: 'application/json; charset=UTF-8',
            }
            return $http(settings)
                .then(_postComplete, _postFailed)
        }
        // ==== <Post Success> ==== //
        function _postComplete(response) {
            // unwrap the data from the response
            console.log("POST complete");
            return reponse.data;
        }
        // ==== <Post Error> ==== //
        function _postFailed(error) {
            var msg = "Failed to insert blog";
            console.log(msg);
            return $q.reject(error);
        }
         return { post: _post }

        // -----[<Get>] ---- //
        //    function _getAll(data) {
        //        var settings = {
        //            url: "https://pacoima-ypi.azurewebsites.net/api/users/register/employer"
        //            , method: "POST"
        //            , cache: false
        //            , data: JSON.stringify(data)
        //            , dataType: "json"
        //        }
        //        return $http(settings)
        //            .then(_getAllSuccess, _getAllError)
        //    }
        //    // ---- [ Success ] ---- //
        //    function _getAllSuccess(response) {
        //        console.log("successfull");
        //        // unwrap the data from the response
        //        //return response.data;
        //    }
        //    // ---- [ Error ] ---- //
        //    function _getAllError(error) {
        //        return $q.reject(error);
        //    }
        //}
    }
})();