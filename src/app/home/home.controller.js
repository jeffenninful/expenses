(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('HomeCtrl', HomeCtrl);

    /** @ngInject */
    function HomeCtrl($state, Session) {

        var vm = this;
        vm.getUser = getProfile;

        init();

        function init() {
            console.log('logged in ',Session.isLoggedIn());

            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        function getProfile() {
            Session.getUser().then(function (data) {
                vm.user = data;
            }, function () {

            });
        }
    }
})();
