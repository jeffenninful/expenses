(function () {
    'use strict';

    /**
     * @ngdoc: function
     * @name: timesheet.controller:HomeCtrl
     */

    angular
        .module('expenses')
        .controller('HomeCtrl', HomeCtrl);

    /* @ngInject */
    function HomeCtrl($state, $filter, Session, Dao, Upload, toastr) {
        var vm = this;
        vm.expense = {};
        vm.expenseTotal = 0;
        vm.milageRate = 0.55;
        vm.currentMonth = $filter('date')(new Date(), 'MMMM');

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('register');
            }
        }

        Dao.getExpenseCategory().then(function (data) {
            vm.expenseCategory = data;
        });

        Session.getProfile().then(function (data) {
            vm.expense.userId = data.profile._id.toString();
            vm.expense.managerId = data.profile.managerId;
        });

        vm.date = {
            format: 'MMM, dd yyyy',
            opened: false,
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(2015, 1, 1),
            open: openCalender
        };

        vm.billingOptions = [
            {name: 'Yes', value: true},
            {name: 'No', value: false}
        ];


        function openCalender() {
            vm.date.opened = true;
        }

        vm.cancel = function () {
            $state.reload();
        };

        vm.saveExpense = function (form) {
            if (form.$valid) {
                vm.receipt ? vm.expense.file = vm.receipt : angular.noop();
                vm.expense.category === 'Mileage' ? vm.expense.amount = vm.expenseTotal : angular.noop();

                Upload.upload({
                    url: 'v1/expense',
                    data: vm.expense
                }).then(function () {
                    vm.receipt = '';
                    vm.expense = {};
                    vm.expenseTotal = 0;
                    form.$setUntouched();
                    form.$setPristine();
                    toastr.success('Expense submitted successfully!', 'Success');
                }, function () {
                    toastr.error('Expense submission failed!', 'Error encountered');
                });
            }
        };

        vm.calculateTotal = function () {
            var total = 0;
            if (vm.expense.amount !== undefined) {
                if (vm.expense.category === 'Mileage') {
                    total += (parseFloat(vm.expense.amount) * vm.milageRate);
                } else {
                    total += parseFloat(vm.expense.amount);
                }
            }
            vm.expenseTotal = isNaN(total) ? 0 : total;
        };
    }

    /**
     *  For multiple files:

     $scope.uploadFiles = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                Upload.upload({data: {file: files[i]}});
            }
            // or send them all together for HTML5 browsers:
            Upload.upload({data: {file: files, 'user': $scope.user}});
        }
    }
     */
})();

