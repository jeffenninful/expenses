(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('NavbarCtrl', NavbarCtrl);

    /** @ngInject */
    function NavbarCtrl($state, Auth, Session, toastr, $location) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;
        vm.isAdmin = isAdmin;
        vm.isManager = isManager;
        vm.isLoggedIn = isLoggedIn;
        vm.isActiveClass = isActiveClass;
        vm.navigate = navigate;

        vm.guest = {};

        Session.getProfile().then(function (data) {
            vm.name = data.profile.firstName;
        });

        function isAdmin() {
            return Session.getUserRole() === 'admin';
        }

        function isManager() {
            return Session.getUserRole() === 'manager';
        }

        function isLoggedIn() {
            return Session.isLoggedIn();
        }

        function isActiveClass(location) {
            return location == $location.path();
        }

        function login(form) {
            if (form.$valid) {
                Auth.login(vm.guest).then(function () {
                    $state.go('home');
                }, function () {
                    toastr.error('Your credentials are invalid', 'Error');
                });
            } else {
                toastr.error('Email and Password is required', 'Error');
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
