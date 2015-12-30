(function () {
    'use strict';

    angular.module('expenses')
        .factory('Dao', dao);

    /** @ngInject */
    function dao($http, $q, Session) {

        return {
            getLocation: getLocation,
            setLocation: setLocation,
            updateLocation: updateLocation,
            getExpense: getExpense,
            getExpenseCategory: getExpenseCategory,
            getDeniedExpense: getDeniedExpense,
            getPendingExpense: getPendingExpense,
            getApprovedExpense: getApprovedExpense,
            getUsers: getUsers,
            getManagers: getManagers,
            saveExpense: saveExpense
        };

        function getLocation() {
            return makeRequest('GET', 'v1/department');
        }

        function setLocation(data) {
            return makeRequest('POST', 'v1/department', data);
        }

        function updateLocation(id, data) {
            return makeRequest('PATCH', 'v1/department/' + id, data);
        }

        function saveExpense(data) {
            return makeRequest('POST', 'v1/expense', data);
        }

        function getExpense() {
            var user = Session.getCookie('UID');
            return makeRequest('GET', 'v1/expense/' + user.profile._id);
        }

        function getExpenseCategory() {
            return makeRequest('GET', 'v1/category');
        }

        function getDeniedExpense() {
            return makeRequest('GET', 'v1/expense/denied');
        }

        function getPendingExpense() {
            return makeRequest('GET', 'v1/expense/pending');
        }

        function getApprovedExpense() {
            return makeRequest('GET', 'v1/expense/approved');
        }

        function getUsers() {
            return makeRequest('GET', 'v1/user');
        }

        function getManagers() {
            //return makeRequest('GET', 'v1/user/');
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
