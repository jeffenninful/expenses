(function () {
    'use strict';
    /**
     * @ngdoc: function
     * @name: expenses.controller:StatusCtrl
     */

    angular
        .module('expenses')
        .controller('StatusCtrl', StatusCtrl);

    /** @ngInject */
    function StatusCtrl($state, Dao, Session) {
        var vm = this;

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        Dao.getExpense().then(function (data) {
            vm.inbox = data;
        });
    }
})();

