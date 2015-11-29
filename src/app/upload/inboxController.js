(function () {
    'use strict';
    /**
     * @ngdoc: function
     * @name: timesheet.controller:NotificationCtrl
     * @description
     * #HomeCtrl
     */

    angular
        .module('expenses')
        .controller('UploadCtrl', UploadCtrl);

    /* @ngInject */
    function UploadCtrl($scope, Upload, $timeout) {

        $scope.name = "Jeff";

        $scope.uploadFiles = function (files) {
            $scope.files = files;
            console.log(files[0]);
            //return;
            if (files && files.length) {
                Upload.upload({
                    url: 'v1/expense',
                    data: {
                        receipt: files[0]
                    }
                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    $scope.progress =
                        Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };


    }
})();

