(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('AccountCtrl', HomeCtrl);

    /** @ngInject */
    function HomeCtrl($state, Session, Dao) {

        var vm = this;
        vm.updateProfile = updateProfile;

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        Session.getProfile().then(function (data) {
            vm.guest = data.profile;
        }, function () { });

        Dao.getLocation().then(function (data) {
            vm.department = data;
        }, function () { });

        function updateProfile() {
            Session.updateProfile(vm.guest).then(function (response) {
                Session.setCookie('UID', response);
                $state.reload();
            }, function () {
                angular.noop();
            });
        }
    }
})();
