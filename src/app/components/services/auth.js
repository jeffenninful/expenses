(function () {
    'use strict';

    angular.module('expenses')
        .factory('Auth', auth);

    /** @ngInject */
    function auth($http, $q, Session) {

        return {
            login: login,
            register: register
        };

        function login(data) {
            return makeRequest('POST', '/v1/authorize', data);
        }

        function register(data) {
            return makeRequest('POST', '/v1/register', data);
        }

        function makeRequest(method, url, data) {
            var deferred = $q.defer();
            $http({
                method: method,
                url: url,
                data: angular.toJson(data)

            }).then(function (response) {
                Session.setCookie('UID', response.data);
                deferred.resolve(response.data);

            }, function (error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        }

    }
})();
