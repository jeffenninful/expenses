(function () {
    'use strict';

    angular.module('expenses')
        .factory('Dao', dao);

    /** @ngInject */
    function dao($http, $q) {

        return {
            getLocation: getLocation,
            getExpenseCategory: getExpenseCategory,
            saveExpense: saveExpense
        };

        function getLocation() {
            return makeRequest('GET', 'v1/department');
        }

        function saveExpense(data) {
            return makeRequest('POST', 'v1/expense', data);
        }

        function getExpenseCategory() {
            return makeRequest('GET', 'v1/category');
        }

        function makeRequest(method, url, data) {
            var deferred = $q.defer();
            $http({
                method: method,
                url: url,
                data: angular.toJson(data)
            }).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }
    }
})
();
