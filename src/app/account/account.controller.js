(function () {
    'use strict';

    angular
        .module('expenses')
        .controller('AccountCtrl', HomeCtrl);

    /** @ngInject */
    function HomeCtrl($state, Session, Dao) {

        var vm = this;
        vm.updateProfile = updateProfile;

        Session.getProfile().then(function (data) {
            vm.guest = data.profile;
        }, function () { });

        Dao.getLocation().then(function (data) {
            vm.department = data;
        }, function () { });

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        function updateProfile() {
            Session.updateProfile(vm.guest).then(function (response) {
                //Session.deleteCookie('UID');
                //Session.setCookie('UID', response.data);
                $state.reload();
            }, function () {
                angular.noop();
            });
        }
    }
})();
