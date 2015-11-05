(function () {
    'use strict';

    angular.module('expenses')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($state, Auth, Session) {
        var vm = this;
        vm.guest = {};
        vm.states = ['AA', 'BB', 'CC'];
        vm.register = register;

        init();

        function init() {
            if (Session.isLoggedIn()) {
                $state.go('home');
            }
        }

        function register(form) {
            if (form.$valid) {
                Auth.register(vm.guest).then(function () {
                    $state.go('home');
                }, function (error) {
                    console.log('Error encountered.', error);
                });
            } else {
                //scroll to first error
                console.log("Errors in form");
            }
        }
    }
}());
