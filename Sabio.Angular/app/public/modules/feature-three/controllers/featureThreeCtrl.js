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