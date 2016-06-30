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
            .state('inbox', {
                url: '/inbox',
                templateUrl: 'app/inbox/inbox.html',
                controller: 'InboxCtrl',
                controllerAs: 'vm',
                title: 'Inbox'
            })
            .state('register', {
                url: '/',
                templateUrl: 'app/register/register.html',
                controller: 'RegisterCtrl',
                controllerAs: 'vm',
                title: 'Register'
            })
            .state('status', {
                url: '/status',
                templateUrl: 'app/status/status.html',
                controller: 'StatusCtrl',
                controllerAs: 'vm',
                title: 'Status'
            })
            .state('serviceError', {
                url: '/serviceError',
                templateUrl: 'app/serviceError/serviceError.html',
                controller: 'ServiceErrorCtrl',
                controllerAs: 'vm',
                title: 'Service Error'
            })
            .state('manage', {
                url: '/manage',
                templateUrl: 'app/manage/manage.html',
                controller: 'ManageCtrl',
                controllerAs: 'vm',
                title: 'Manage'
            })
            .state('manage.department', {
                url: '/department',
                templateUrl: 'app/manage/department/department.html',
                controller: 'DepartmentCtrl',
                controllerAs: 'vm',
                title: 'Department',
                parent: 'manage'
            })
            .state('manage.expense', {
                url: '/expense',
                templateUrl: 'app/manage/expense/expense.html',
                controller: 'ExpenseCtrl',
                controllerAs: 'vm',
                title: 'Expense',
                parent: 'manage'
            })
            .state('manage.category', {
                url: '/category',
                templateUrl: 'app/manage/expenseCategory/category.html',
                controller: 'CategoryCtrl',
                controllerAs: 'vm',
                title: 'Category',
                parent: 'manage'
            })
            .state('manage.user', {
                url: '/user',
                templateUrl: 'app/manage/user/user.html',
                controller: 'UserCtrl',
                controllerAs: 'vm',
                title: 'Category',
                parent: 'manage'
            })
            .state('manage.project', {
                url: '/project',
                templateUrl: 'app/manage/project/project.html',
                controller: 'ProjectCtrl',
                controllerAs: 'vm',
                title: 'Project',
                parent: 'manage'
            });

        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
    }

})();
