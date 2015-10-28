(function() {
  'use strict';

  angular
    .module('expenses')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'vm'
      })
      .state('serviceError', {
        url: '/serviceError',
        templateUrl: 'app/serviceError/error.html',
        controller: 'ServiceErrorController',
        controllerAs: 'vm'
      })
      .state('expense', {
        url: '/expense',
        templateUrl: 'app/expense/expense.html',
        controller: 'ExpenseController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
