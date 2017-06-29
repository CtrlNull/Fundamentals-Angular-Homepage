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

        // ViewModel
        vm.items = [];
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
        vm.orderBy = 'name';
        vm.reverse = '';

        // "The fold"

        _render();

        function _render() {
            vm.dogService.getAll()
                .then(_getAllSuccess, _getAllError);
        }

        function _getAllSuccess(response) {
            if (response && response.data && response.data.items) {
                vm.items = response.data.items;
            }
            vm.alertService.success("Retrieved all");
        }

        function _getAllError(response) {
            if (response && response.data && response.data.message) {
                vm.alertService.error(response.data.message, "GetAll failed");
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

        function _getByIdSuccess(response) {
            if (response && response.data && response.data.item) {
                vm.item = response.data.item;
            }
            else {
                vm.alertService.error("Item has been deleted from the system.")
            }
        }

        function _getByIdError(response) {
            if (response && response.data && response.data.message) {
                vm.alertService.error(response.data.message, "GetById failed");
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
                //vm.editForm.$setDirty();  // set form as dirty, to make validation messages visible.
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

        function _putSuccess(response) {
            // To update UI, replace with new version
            vm.items[vm.itemIndex] = vm.item;
            _endEdit();
            vm.alertService.success("Update successful");
        }

        function _putError(response) {
            if (response && response.data && response.data.message) {
                vm.alertService.error(response.data.message, "Update failed");
            }
            else {
                vm.alertService.error("Unable to retrieve data", "Update failed");
            }
        }

        function _postSuccess(response) {
            if (response && response.data && response.data.item) {
                // To update UI, get id from data
                vm.item.id = response.data.item;
                vm.items.push(vm.item);
                _endEdit();
                vm.alertService.success("Insert successful");
            }
        }

        function _postError(jqXHR) {
            if (response && response.data && response.data.message) {
                vm.alertService.error(response.data.message, "Insert failed");
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

        function _deleteSuccess(response) {
            // To update UI, replace with new version
            vm.items.splice(vm.itemIndex, 1);
            _endEdit();
            vm.alertService.success("Delete successful");
        }

        function _deleteError(response) {
            if (response && response.data && response.data.message) {
                vm.alertService.error(response.data.message, "Delete failed");
            }
            else {
                vm.alertService.error("Unable to delete item", "Delete failed");
            }
        }
    }

})();