(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('NavbarCtrl', NavbarCtrl);

    /** @ngInject */
    function NavbarCtrl($state, Auth) {
        var vm = this;
        vm.guest = {};
        vm.login = login;
        vm.logout = logout;

        function login(form) {
            if (form.$valid) {
                Auth.login(vm.guest).then(function () {
                    $state.go('home');
                }, function (error) {
                    console.log('Error encountered.', error);
                });
            } else {
                console.log("Errors in form");
            }
        }

        function logout(){
            localStorage.removeItem('authUser');
            $state.go('login');
        }
    }
})();
