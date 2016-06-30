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
     * @name: timesheet.controller:ExpenseCtrl
     */

    angular
        .module('expenses')
        .controller('ExpenseCtrl', ExpenseCtrl);

    /** @ngInject */
    function ExpenseCtrl($uibModal, NgTableParams, Dao) {
        var vm = this;
        vm.departments = [];

        vm.expenses = new NgTableParams({
            sorting: {description: 'asc'}
        }, {
            getData: function () {
                return Dao.getApprovedExpense().then(function (data) {
                    return data;
                })
            }
        });

        vm.hasNoExpenses = function () {
            return vm.expenses.data ? vm.expenses.data.length === 0 : false;
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

