/**
 * Created by JEnninful on 12/29/15.
 */
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
        .controller('ExpenseListCtrl', ExpenseListCtrl);

    /** @ngInject */
    function ExpenseListCtrl($uibModal, Dao) {
        var vm = this;
        vm.departments = null;

        vm.showModal = showModal;

        Dao.getApprovedExpense().then(function (data) {
            vm.expenses = data;
        });

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

