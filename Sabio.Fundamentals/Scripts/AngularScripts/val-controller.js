(function () {
    angular.module("FormList")
        .controller("MyController", MyController);

    MyController.$inject = ["CallService", "$q"]; // Calls call-service.js

    function MyController(CallService, $q) {
        var vm = this;
        vm.CallService = CallService;

        vm.$onInit = _init;

        function _init() {
            vm.CallService.getAll(data)
                .then(_getAllSuccess, _getAllError);
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

    }


})();