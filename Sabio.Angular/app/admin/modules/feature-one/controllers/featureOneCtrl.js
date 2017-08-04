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