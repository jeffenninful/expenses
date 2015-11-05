(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('NavbarCtrl', NavbarCtrl);

    /** @ngInject */
    function NavbarCtrl($state, Auth, Session) {
        var vm = this;
        vm.guest = {};
        vm.login = login;
        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.items = [
            'Settings 1',
            'Settings 2'
        ];

        Session.getProfile().then(function (data) {
            vm.name = data.profile.firstName;
        });

        function isLoggedIn() {
            return Session.isLoggedIn();
        }

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

        function logout() {
            Session.logout().then(function () {
                Session.deleteCookie('UID');
                $state.go('login');
            });
        }
    }
})();
