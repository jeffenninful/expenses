/**
 * Created by JEnninful on 12/29/15.
 */
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
        .controller('UserListCtrl', UserListCtrl);

    /** @ngInject */
    function UserListCtrl($uibModal, Dao) {
        var vm = this;
        vm.departments = null;

        vm.showModal = showModal;

        Dao.getUsers().then(function (data) {
            vm.users = data;
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

