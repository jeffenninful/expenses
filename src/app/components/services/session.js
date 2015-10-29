(function () {
    'use strict';

    angular.module('expenses')
        .factory('Session', session);

    /** @ngInject */
    function session($http, $q) {

        return {
            getUser: getUser,
            isLoggedIn: isLoggedIn
        };

        function getUser(data) {
            return makeRequest('GET', '/v1/user', data);
        }

        function isLoggedIn() {
            return localStorage.getItem('authUser');
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
})();
