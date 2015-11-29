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
        .controller('HomeCtrl', HomeCtrl);

    /* @ngInject */
    function HomeCtrl($state, $filter, Session, Dao) {
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

        Dao.getExpenseCategory().then(function (data) {
            vm.expenseCategory = data;
        });

        vm.billingOptions = [
            {name: 'Yes'},
            {name: 'No'}
        ];

        vm.open = open;
        vm.cancel = cancel;
        vm.reset = reset;
        vm.newField = newField;
        vm.deleteField = deleteField;
        vm.saveExpense = saveExpense;
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

        function saveExpense(form) {
            if (form.$valid) {
                console.log('form is valid', vm.data);
                Dao.saveExpense(vm.data[0]).then(function (data) {
                    console.log('expense saved', data);

                }, function (error) {
                    console.log('error saving expense', error);
                });
                vm.reset();
                form.$setUntouched();
                form.$setPristine();
            } else {
                console.log('form has errors ');
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
})();

