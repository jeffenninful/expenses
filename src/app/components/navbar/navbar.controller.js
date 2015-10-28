(function () {
  'use strict';

  angular
    .module('expenses')
    .controller('NavbarController', NavbarController);

  /** @ngInject */
  function NavbarController($state, Auth) {
    var vm = this;
    vm.guest = {};
    vm.login = login;

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
  }
})();
