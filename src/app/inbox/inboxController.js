(function () {
    'use strict';
    /**
     * @ngdoc: function
     * @name: timesheet.controller:NotificationCtrl
     * @description
     * #HomeCtrl
     */

    angular
        .module('expenses')
        .controller('InboxCtrl', InboxCtrl);

    /* @ngInject */
    function InboxCtrl($state, Session) {
        var vm = this;

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        vm.inbox = [
            {
                date: '1/1/2015',
                subject: 'Expense Approved',
                message: 'Your expense has been approved by your manager',
                read: true
            },
            {
                date: '2/2/2015',
                subject: 'Expense Approved',
                message: 'Your expense has been approved by your manager',
                read: false
            },
            {
                date: '3/3/2015',
                subject: 'Expense Denied',
                message: 'Your expense has been denied by your manager',
                read: true
            }
        ];

    }
})();

