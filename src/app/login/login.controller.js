(function () {
    'use strict';

    angular.module('expenses')
        .controller('LoginCtrl', LoginCtrl);

    /** @ngInject */
    function LoginCtrl($state, Auth) {
        var vm = this;
        vm.guest = {};
        vm.states = ['AA', 'BB', 'CC'];
        vm.register = register;

        function register(form) {
            if (form.$valid) {
                Auth.register(vm.guest).then(function () {
                    $state.go('home');
                }, function (error) {
                    console.log('Error encountered.', error);
                });
            } else {
                console.log("Errors in form");
            }
        }
    }
}());
