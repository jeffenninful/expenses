/**
 * Created by JEnninful on 12/29/15.
 */
(function () {
    'use strict';

    /**
     * @ngdoc: function
     * @name: timesheet.controller:ManageCtrl
     */

    angular
        .module('expenses')
        .controller('DepartmentModalCtrl', DepartmentModalCtrl);

    /** @ngInject */
    function DepartmentModalCtrl($uibModalInstance, $state, Dao, toastr, action, data) {
        var vm = this;

        vm.action = action;
        vm.department = data || {};
        vm.activeOptions = [
            {name: 'Yes', value: true},
            {name: 'No', value: false}
        ];
        vm.cancelModal = cancelModal;
        vm.saveDepartment = saveDepartment;

        function cancelModal() {
            $uibModalInstance.dismiss();
        }

        function saveDepartment(form) {
            if (form.$valid) {
                if (action === 'add') {
                    Dao.setLocation(vm.department).then(function () {
                        $uibModalInstance.close();
                        $state.reload();
                    }, function () {
                        toastr.error('Department was not added successfully', 'Error');
                    });
                } else {
                    Dao.updateLocation(vm.department._id ,vm.department).then(function () {
                        $uibModalInstance.close();
                        $state.reload();
                    }, function () {
                        toastr.error('Department was not added successfully', 'Error');
                    });
                }
            }
        }

    }
})();

