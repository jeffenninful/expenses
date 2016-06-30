/**
 * Created by JEnninful on 12/29/15.
 */

(function () {
    'use strict';

    /**
     * @ngdoc: function
     * @name: timesheet.controller:UserCtrl
     */

    angular
        .module('expenses')
        .controller('UserCtrl', UserCtrl);

    /** @ngInject */
    function UserCtrl($uibModal, NgTableParams, Dao) {
        var vm = this;
        vm.departments = null;

        vm.users = new NgTableParams({
            sorting: {'firstName': 'asc'}
        }, {
            getData: function () {
                return Dao.getUsers().then(function (data) {
                    return data;
                });
            }
        });

        vm.hasNoUsers = function () {
            return vm.users.data ? vm.users.data.length === 0 : false;
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
})
();

