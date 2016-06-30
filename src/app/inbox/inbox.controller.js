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
    function InboxCtrl($state, Session, Dao) {
        var vm = this;

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('register');
            }
        }

        Dao.getExpense().then(function (data) {
            vm.inbox = data;
        });
    }
})();

