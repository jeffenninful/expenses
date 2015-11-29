(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('NavbarCtrl', NavbarCtrl);

    /** @ngInject */
    function NavbarCtrl($state, Auth, Session, toastr) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.isLoggedIn = isLoggedIn;
        vm.navigate = navigate;

        vm.guest = {};
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
                }, function () {
                    toastr.error('Your credentials are invalid', 'Error');
                });
            } else {
                toastr.error('Email and Password are required', 'Error');
            }
        }

        function logout() {
            Session.logout().then(function () {
                Session.deleteCookie('UID');
                $state.go('login');
            });
        }


        function navigate(route) {
            $state.go(route);
        }

    }
})();
