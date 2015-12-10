(function () {
    'use strict';

    /**
     * @ngdoc: function
     * @name: timesheet.controller:HomeCtrl
     */

    angular
        .module('expenses')
        .controller('InboxCtrl', InboxCtrl);

    /* @ngInject */
    function InboxCtrl($state, $filter, Session, Dao, Upload, toastr) {
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

