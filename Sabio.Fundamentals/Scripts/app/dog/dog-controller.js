(function () {
    "use strict";
    angular.module('mainApp')
        .controller('dogController', DogController);

    // Inject services that our controller depends upon
    DogController.$inject = ['$scope', 'alertService', 'dogService']

    function DogController($scope, alertService, dogService) {
        // Administrative stuff
        var vm = this;
        vm.dogService = dogService;
        vm.alertService = alertService;
        vm.$scope = $scope;

        // ViewModel
        vm.items = []; // all items from the AJAX call
        vm.filteredItems = []; // list of items that meet filter criterion

        // Angular will automatically set this to reference the form if the form
        // has a matching name attribute
        vm.editForm = null;
        vm.item = null;  // copy of item being edited
        vm.itemIndex = -1; // index of item being edited
        vm.select = _select;
        vm.save = _save;
        vm.cancel = _cancel;
        vm.add = _add;
        vm.delete = _delete;

        vm.currentPage = 1;
        vm.itemsPerPage = 8;
        vm.totalItems = 1000;
        vm.itemsPerPageOptions = [4, 8, 12, 16];
        vm.searchText = '';
        vm.orderBy = 'name';
        vm.reverse = '';
        vm.filter = _filter;

        vm.$onInit = _init;

        vm.hasValidationError = _hasValidationError;
        vm.showValidationError = _showValidationError;

        // "The fold"

        function _init() {
            vm.dogService.getAll()
                .then(_getAllSuccess, _getAllError);
        }

        function _filter() {
            vm.filteredItems = vm.items.filter(_dogFilter);
        }

        function _getAllSuccess(data) {
            if (data && data.items) {
                vm.items = data.items;
                _filter();
            }
            vm.alertService.success("Retrieved dogs");
        }

        function _dogFilter(dog) {
            if (!vm.searchText) {
                return true;
            }
            var searchString = vm.searchText.toUpperCase();
            return (dog.name.toUpperCase().indexOf(searchString) > -1)
                || (dog.breed.toUpperCase().indexOf(searchString) > -1);
        }

        function _getAllError(error) {
            if (error && error.message) {
                vm.alertService.error(error.message, "GetAll failed");
            }
            else {
                vm.alertService.error("Unable to retrieve data", "GetAll failed");
            }
        }

        function _select(item, index) {
            // Keep track of the position in vm.items of
            // the item we will be editing
            vm.itemIndex = index;
            // get a fresh copy of the object to be edited from the database.
            vm.dogService.getById(item.id)
                .then(_getByIdSuccess, _getByIdError)
            vm.editForm.$setPristine();
        }

        function _getByIdSuccess(data) {
            if (data && data.item) {
                vm.item = data.item;
            }
            else {
                vm.alertService.error("Item has been deleted from the system.")
            }
        }

        function _getByIdError(error) {
            if (error && error.message) {
                vm.alertService.error(error.message, "GetById failed");
            }
            else {
                vm.alertService.error("Unable to retrieve data", "GetById failed");
            }
        }

        // create a new empty item
        function _add() {
            // Changing item from null to empty object indicates any
            // ui components for editing should be shown
            vm.item = {};
            vm.itemIndex = -1;
            // set the form $submitted to false and the form and all controls $dirty to false
            vm.editForm.$setPristine();
        }

        function _cancel() {
            _endEdit();
        }

        function _endEdit() {
            vm.item = null;
            vm.itemIndex = -1;
        }

        function _save(isValid) {
            if (vm.editForm.$invalid) {
                vm.alertService.warning('Some information is not entered correctly, please review the validation messages and try again.',
                    'Save Failed');
                return;
            }
            if (vm.item.id) {
                vm.dogService.put(vm.item)
                    .then(_putSuccess, _putError);
            }
            else {
                vm.dogService.post(vm.item)
                    .then(_postSuccess, _postError);
            }
        }

        function _putSuccess(data) {
            // To update UI, replace with new version
            vm.items[vm.itemIndex] = vm.item;
            _endEdit();
            vm.alertService.success("Update successful");
        }

        function _putError(error) {
            if (error && error.message) {
                vm.alertService.error(error.message, "Update failed");
            }
            else {
                vm.alertService.error("Unable to retrieve data", "Update failed");
            }
        }

        function _postSuccess(data) {
            if (data && data.item) {
                // To update UI, get id from data
                vm.item.id = data.item;
                vm.items.push(vm.item);
                _endEdit();
                vm.alertService.success("Insert successful");
            }
        }

        function _postError(error) {
            if (error && error.message) {
                vm.alertService.error(error.message, "Insert failed");
            }
            else {
                vm.alertService.error("Unable to retrieve data", "Insert failed");
            }
        }

        function _delete() {
            if (vm.item.id) {
                vm.dogService.delete(vm.item.id)
                    .then(_deleteSuccess, _deleteError);
            }
        }

        function _deleteSuccess(data) {
            // To update UI, replace with new version
            vm.items.splice(vm.itemIndex, 1);
            _endEdit();
            vm.alertService.success("Delete successful");
        }

        function _deleteError(error) {
            if (error && error.message) {
                vm.alertService.error(error.message, "Delete failed");
            }
            else {
                vm.alertService.error("Unable to delete item", "Delete failed");
            }
        }

        function _hasValidationError(propertyName) {
            return (vm.editForm.$submitted || vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$invalid;
        }

        function _showValidationError(propertyName, ruleName) {
            return (vm.editForm.$submitted || vm.editForm[propertyName].$dirty)
                && vm.editForm[propertyName].$error[ruleName];
        }
    }

})();