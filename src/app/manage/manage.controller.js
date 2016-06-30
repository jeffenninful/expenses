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
    function ManageCtrl() {
        var vm = this;
        vm.title = '';
    }
})();

