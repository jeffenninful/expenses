(function () {
    'use strict';

    /**
     * @ngdoc: function
     * @name: timesheet.controller:ManageCtrl
     */

    angular
        .module('expenses')
        .controller('ManageCtrl', ManageCtrl);

    /** @ngInject */
    function ManageCtrl($state, $uibModal, Session, Dao, toastr) {
        var vm = this;
        //vm.addDepartment = addDepartment;
        //vm.editExpense = editExpense;
        //vm.cancelModal = cancelModal;
        //vm.saveDepartment = saveDepartment;
        //
        //vm.activeOptions = [
        //    {name: 'Yes', value: true},
        //    {name: 'No', value: false}
        //];
        //
        //init();
        //
        //function init() {
        //    if (!Session.isLoggedIn()) {
        //        $state.go('login');
        //    }
        //}
        //
        //function cancelModal(){
        //    $uibModalInstance.dismiss();
        //}
        //
        //function saveDepartment(){
        //    $uibModalInstance.save();
        //}
        //
        //
        //function editExpense(item) {
        //    console.log('item', item);
        //
        //}
        //
        //function addDepartment(size) {
        //    var modalInstance = $uibModal.open({
        //        templateUrl: 'app/manage/updateDepartment.html',
        //        controller: 'ManageCtrl as vm',
        //        size: size || 'md'
        //    });
        //
        //}
        //
        ////Dao.getApprovedExpense().then(function (data) {
        //Dao.getPendingExpense().then(function (data) {
        //    vm.expenses = data;
        //});
        //
        //Dao.getLocation().then(function (data) {
        //    vm.departments = data;
        //});
        //
        //Dao.getUsers().then(function (data) {
        //    vm.users = data;
        //});


    }
})();

