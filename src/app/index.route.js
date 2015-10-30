(function () {
    'use strict';

    angular
        .module('expenses')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('account', {
                url: '/account',
                templateUrl: 'app/account/account.html',
                controller: 'AccountCtrl',
                controllerAs: 'vm',
                title: 'My Account'
            })
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                title: 'Login'
            })
            .state('expense', {
                url: '/expense',
                templateUrl: 'app/expense/expense.html',
                controller: 'ExpenseCtrl',
                controllerAs: 'vm',
                title: 'Expenses'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                title: 'Home'
            })
            .state('serviceError', {
                url: '/serviceError',
                templateUrl: 'app/serviceError/error.html',
                controller: 'ServiceErrorCtrl',
                controllerAs: 'vm',
                title: 'Service Error'
            });

        $urlRouterProvider.otherwise('/');
    }

})();
