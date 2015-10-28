(function () {
  'use strict';

  angular.module('expenses')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($state, Auth) {
    var vm = this;
    vm.guest = {};
    vm.states = ['AA', 'BB', 'CC'];
    vm.register = register;

    function showMessage(msg) {
      alert(msg);
    }

    function register(form) {
      if (form.$valid) {
        Auth.register(vm.guest).then(function (data) {
          showMessage('Data posted successfully.', data);
          $state.go('home');
        }, function (error) {
          showMessage('Error encountered.', error);
        });
      } else {
        console.log("Errors in form");
      }
    }

  }
}());
