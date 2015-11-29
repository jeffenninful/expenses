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
                url: '/home',
                templateUrl: 'app/home/home.html',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                title: 'Home'
            })
            .state('login', {
                url: '/',
                templateUrl: 'app/login/login.html',
                controller: 'LoginCtrl',
                controllerAs: 'vm',
                title: 'Login'
            })
            .state('notification', {
                url: '/notification',
                templateUrl: 'app/notification/notification.html',
                controller: 'NotificationCtrl',
                controllerAs: 'vm',
                title: 'Notification'
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
