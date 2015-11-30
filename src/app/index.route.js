(function () {
    'use strict';

    angular
        .module('expenses')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('account', {
                url: '/account',
                templateUrl: 'app/account/account.html',
                controller: 'AccountCtrl',
                controllerAs: 'vm',
                title: 'My Account'
            })
            .state('home', {
                url: '/',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                title: 'Home'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                title: 'Login'
            })
            .state('inbox', {
                url: '/inbox',
                templateUrl: 'app/inbox/inbox.html',
                controller: 'InboxCtrl',
                controllerAs: 'vm',
                title: 'Inbox'
            })
            .state('serviceError', {
                url: '/serviceError',
                templateUrl: 'app/serviceError/serviceError.html',
                controller: 'ServiceErrorCtrl',
                controllerAs: 'vm',
                title: 'Service Error'
            });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    }

})();
