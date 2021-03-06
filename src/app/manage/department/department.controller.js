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
        .controller('DepartmentCtrl', DepartmentCtrl);

    /** @ngInject */
    function DepartmentCtrl($uibModal, Dao) {
        var vm = this;
        vm.departments = [];
        vm.showModal = showModal;
        vm.hasDepartments = hasDepartments;

        Dao.getLocation().then(function (data) {
            vm.departments = data;
        });

        function hasDepartments() {
            return vm.departments.length === 0;
        }

        function showModal(action, data) {
            $uibModal.open({
                templateUrl: 'app/manage/department/departmentModal.html',
                controller: 'DepartmentModalCtrl as vm',
                size: 'md',
                animation: true,
                resolve: {
                    action: function () {
                        return action;
                    },
                    data: function () {
                        return data;
                    }
                }
            });
        }
    }
})();

