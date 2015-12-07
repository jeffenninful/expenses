(function () {
    'use strict';

    angular.module('expenses')
        .factory('Dao', dao);

    /** @ngInject */
    function dao($http, $q, Session) {

        return {
            getLocation: getLocation,
            getExpenses: getExpenses,
            getExpenseCategory: getExpenseCategory,
            saveExpense: saveExpense
        };

        function getLocation() {
            return makeRequest('GET', 'v1/department');
        }

        function saveExpense(data) {
            return makeRequest('POST', 'v1/expense', data);
        }

        function getExpenses() {
            var user = Session.getCookie('UID');
            return makeRequest('GET', 'v1/expense/'+ user.profile._id);
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
