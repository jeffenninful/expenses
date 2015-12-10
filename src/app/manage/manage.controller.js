(function () {
    'use strict';

    /**
     * @ngdoc: function
     * @name: timesheet.controller:ManageCtrl
     */

    angular
        .module('expenses')
        .controller('ManageCtrl', ManageCtrl);

    /** @ngInject */
    function ManageCtrl($state, $filter, Session, Dao, Upload, toastr) {
        var vm = this;

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        Dao.getExpenses().then(function (data) {
            vm.inbox = data;
        });
    }
})();

