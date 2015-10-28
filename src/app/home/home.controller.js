(function () {
  'use strict';

  angular
    .module('expenses')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController(Session) {
    var vm = this;

    vm.getUser = getProfile;

    function getProfile() {
      Session.getUser().then(function (data) {
        vm.user = data;
      }, function () {

      });
    }
  }
})();
