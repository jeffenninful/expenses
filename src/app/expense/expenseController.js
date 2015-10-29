(function () {
    'use strict';
    /**
     * @ngdoc: function
     * @name: timesheet.controller:HomeCtrl
     * @description
     * #HomeCtrl
     */

    angular
        .module('expenses')
        .controller('ExpenseCtrl', ExpenseCtrl);

    /* @ngInject */
    function ExpenseCtrl($state, $filter, Session) {
        var vm = this;

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        vm.user = "John Doe";
        vm.data = [];
        vm.opened = [];
        vm.count = 0;
        vm.expenses = [0];
        vm.expenseTotal = 0;
        vm.milageRate = 0.55;
        vm.format = 'dd-MM-yy';
        vm.currentMonth = $filter('date')(new Date(), 'MMMM');
        vm.expenseCategory = [
            {name: 'Airfare'}, {name: 'Car Rental'},
            {name: 'Cell Phone'}, {name: 'Dues/Subscription'},
            {name: 'Employee Welfare'}, {name: 'Job board'},
            {name: 'lodging'}, {name: 'Meals/Entertainment-50%'},
            {name: 'Meals/Entertainment-100%'}, {name: 'Mileage'},
            {name: 'Office Equipment'}, {name: 'Office Furniture'},
            {name: 'Office Supplies'}, {name: 'Parking/Taxi'},
            {name: 'Partner Expenses'}, {name: 'Postage'},
            {name: 'Software'}, {name: 'Other'}
        ];
        vm.billingOptions = [
            {name: 'Yes'},
            {name: 'No'}
        ];

        vm.open = open;
        vm.cancel = cancel;
        vm.reset = reset;
        vm.newField = newField;
        vm.deleteField = deleteField;
        vm.submitExpenses = submitExpenses;
        vm.calculateTotal = calculateTotal;


        function open($event, index) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = [];
            vm.opened[index] = true;
        }

        function newField() {
            vm.count++;
            vm.expenses.push(vm.count);
        }

        function submitExpenses(form) {
            if (form.$valid) {
                angular.forEach(vm.data, function () {

                });
                vm.reset();
                form.$setUntouched();
                form.$setPristine();
            }
        }


        function deleteField(index) {
            vm.expenses.splice(index, 1);
            vm.data.splice(index, 1);
        }

        function cancel() {
            $state.go('home');
        }

        function reset() {
            vm.expenses = [0];
            vm.expenseTotal = 0;
            vm.data = [];
        }

        function calculateTotal() {
            var total = 0;
            angular.forEach(vm.data, function (value) {
                if (value.amount !== undefined) {
                    if (value.category === 'Mileage') {
                        total += (parseInt(value.amount, 10) * vm.milageRate);
                    } else {
                        total += parseInt(value.amount, 10);
                    }
                }
            });
            vm.expenseTotal = isNaN(total) ? 0 : total;
        }


    }


})
();
