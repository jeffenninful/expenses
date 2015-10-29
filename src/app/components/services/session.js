(function () {
    'use strict';

    angular.module('expenses')
        .factory('Session', session);

    /** @ngInject */
    function session($http, $q) {

        return {
            getProfile: getProfile,
            getId: getId,
            getToken: getToken,
            logout: logout,
            isLoggedIn: isLoggedIn
        };

        function getId() {
            var user = JSON.parse(localStorage.getItem('authUser'));
            return user ? user.id : 123;
        }

        function getToken() {
            var user = JSON.parse(localStorage.getItem('authUser'));
            return user ? user.token : null;
        }

        function getProfile(data) {
            return makeRequest('GET', '/v1/user/'+ this.getId(), data);
        }


        function isLoggedIn() {
            return localStorage.getItem('authUser');
        }

        function logout() {
            var defer = $q.defer();
            localStorage.removeItem('authUser');
            defer.resolve();
            return defer.promise;
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
