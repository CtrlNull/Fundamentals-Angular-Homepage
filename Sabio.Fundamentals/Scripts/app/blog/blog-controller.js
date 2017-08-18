(function () {
    "use strict";
    angular.module('mainApp')
        .controller('blogController', BlogController);

    // Inject services that our controller depends upon
    BlogController.$inject = ['toastr', 'blogService']

    function BlogController(toastr, blogService) {
        // Administrative stuff
        var vm = this;


        // ViewModel
        vm.items = [];
        vm.item = null;  // copy of item being edited
        vm.itemIndex = -1; // index of item being edited
        vm.select = _select;
        vm.save = _save;
        vm.cancel = _cancel;
        vm.add = _add;
        vm.delete = _delete;

        // "The fold"

        vm.$onInit = _init;

        function _init() {
            blogService.getAll()
                .then(_getAllSuccess, _getAllError);
        }

        function _getAllSuccess(data) {
            if (data && data.items) {
                vm.items = data.items;
            }
            alertService.success("Retrieved Blogs");
        }

        function _getAllError(error) {
            if (error && error.message) {
                alertService.error(error.message, "GetAll failed");
            }
            else {
                alertService.error("Unable to retrieve data", "GetAll failed");
            }
        }

        function _select(item, index) {
            // Keep track of the position in vm.items of
            // the item we will be editing
            vm.itemIndex = index;
            // get a fresh copy of the object to be edited from the database.
            blogService.getById(item.id)
                .then(_getByIdSuccess, _getByIdError)
        }

        function _getByIdSuccess(data) {
            if (data && data.item) {
                vm.item = data.item;
            }
            else {
                alertService.error("Item has been deleted from the system.")
            }
        }

        function _getByIdError(error) {
            if (error && error.message) {
                alertService.error(error.message, "GetById failed");
            }
            else {
                alertService.error("Unable to retrieve data", "GetById failed");
            }
        }

        // create a new empty item
        function _add() {
            // Changing item from null to empty object indicates any
            // ui components for editing should be shown
            vm.item = {};
            vm.itemIndex = -1;
        }

        function _cancel() {
            _endEdit();
        }

        function _endEdit() {
            vm.item = null;
            vm.itemIndex = -1;
        }

        function _save() {
            // The authorId is not in the data returned from the get request, but
            // is required in the POST/PUT request, so we are setting it to
            // a known valid authorId of 1931.
            vm.item.authorId = 1931;
            if (vm.item.id) {
                blogService.put(vm.item)
                    .then(_putSuccess, _putError);
            }
            else {
                blogService.post(vm.item)
                    .then(_postSuccess, _postError);
            }
        }

        function _putSuccess(data) {
            // To update UI, replace with new version, put doesn't return anything
            vm.items[vm.itemIndex] = vm.item;
            _endEdit();
            alertService.success("Update successful");
        }

        function _putError(error) {
            if (error && error.message) {
                alertService.error(error.message, "Update failed");
            }
            else {
                alertService.error("Unable to retrieve data", "Update failed");
            }
        }

        function _postSuccess(data) {
            if (data && data.item) {
                // To update UI, get id from data
                vm.item.id = data.item;
                vm.items.push(vm.item);
                _endEdit();
                alertService.success("Insert successful");
            }
        }

        function _postError(error) {
            if (error && error.message) {
                alertService.error(error.message, "Insert failed");
            }
            else {
                alertService.error("Unable to retrieve data", "Insert failed");
            }
        }

        function _delete() {
            if (vm.item.id) {
                blogService.delete(vm.item.id)
                    .then(_deleteSuccess_deleteError);
            }
        }

        function _deleteSuccess(data) {
            // To update UI, replace with new version
            vm.items.splice(vm.itemIndex, 1);
            _endEdit();
            alertService.success("Delete successful");
        }

        function _deleteError(error) {
            if (error && error.message) {
                alertService.error(error.message, "Delete failed");
            }
            else {
                alertService.error("Unable to delete item", "Delete failed");
            }
        }
    }

})();