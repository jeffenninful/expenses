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
    function HomeCtrl($state, $filter, Session, Dao, toastr) {
        var vm = this;
        vm.expense = {};
        vm.expenseTotal = 0;
        vm.milageRate = 0.55;
        vm.currentMonth = $filter('date')(new Date(), 'MMMM');

        init();

        function init() {
            if (!Session.isLoggedIn()) {
                $state.go('login');
            }
        }

        Dao.getExpenseCategory().then(function (data) {
            vm.expenseCategory = data;
        });
        Session.getProfile().then(function(data){
            vm.expense.user = data.profile._id.toString();
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


        vm.cancel = cancel;
        vm.saveExpense = saveExpense;
        vm.calculateTotal = calculateTotal;


        function openCalender() {
            vm.date.opened = true;
        }

        function cancel() {
            $state.reload();
        }

        function saveExpense(form) {
            if (form.$valid) {
                Dao.saveExpense(vm.expense).then(function (data) {
                    console.log('expense saved', data);
                    vm.expense = {};
                    vm.expenseTotal = 0;
                    form.$setUntouched();
                    form.$setPristine();
                    toastr.success('Expense submitted successfully!', 'Success');
                }, function () {
                    toastr.error('Expense submission failed!', 'Error encountered');
                });
            }
        }

        function calculateTotal() {
            var total = 0;
            if (vm.expense.amount !== undefined) {
                if (vm.expense.category === 'Mileage') {
                    total += (parseInt(vm.expense.amount, 10) * vm.milageRate);
                } else {
                    total += parseInt(vm.expense.amount, 10);
                }
            }
            vm.expenseTotal = isNaN(total) ? 0 : total;
        }
    }
})();

