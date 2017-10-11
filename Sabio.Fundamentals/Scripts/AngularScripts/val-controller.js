(function () {
    angular.module("FormList")
        .controller("MyController", MyController);

    MyController.$inject = ["CallService", "$q", "$scope"]; // Calls call-service.js

    function MyController(CallService, $q, $scope) {
        var vm = this;
        vm.clicky = _clicky;
        vm.item = null;
        vm.CallService = CallService;
        
        /// ====== Post Data ====== //
        /// == (Post Success) == ///
        function _postSuccess(data) {
            if (data && data.item) {
                // To update UI, get id form data
                vm.item.id = data.item;
                vm.items.push(vm.item);
            }
        }
        // == [ Error ] == //
        function _postError(error) {
            console.log("Error");
        }
        // == [clicky to post] == //
        function _clicky() {
            CallService.post(vm.item)
                .then(_postSuccess, _postError);
        }
        /// ====== Post END ====== ///
    }
})();