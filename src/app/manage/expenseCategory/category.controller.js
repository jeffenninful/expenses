/**
 * Created by JEnninful on 12/29/15.
 */
(function () {
    'use strict';

    /**
     * @ngdoc: function
     * @name: timesheet.controller:CategoryCtrl
     */

    angular
        .module('expenses')
        .controller('CategoryCtrl', CategoryCtrl);

    /** @ngInject */
    function CategoryCtrl($uibModal, Dao) {
        var vm = this;
        vm.departments = [];


        Dao.getLocation().then(function (data) {
            vm.departments = data;
        });

        vm.hasNoDepartments = function () {
            return vm.departments.length === 0;
        };

        vm.showModal = function (action, data) {
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
        };
    }
})();

