(function () {
    'use strict';

    angular.module('expenses')
        .controller('RegisterCtrl', RegisterCtrl);

    /** @ngInject */
    function RegisterCtrl($state, Auth, Session) {
        var vm = this;
        vm.guest = {};
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
                }, function (response) {
                    console.log('Error', response);
                    response.error.forEach(function(error){
                        form[error.field].$setValidity(error.code, false);
                    });
                });
            } else {
                //scroll to first error
                console.log("Errors in form");
            }
        }
    }
}());
