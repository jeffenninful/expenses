(function () {
    'use strict';

    angular.module('expenses')
        .factory('Session', session);

    /** @ngInject */
    function session($http, $q) {

        return {
            getUser: getUser,
            reloadUser: reloadUser,
            logout: logout,
            isLoggedIn: isLoggedIn,
            saveUser: saveUser
        };

        function isLoggedIn() {
            return !!localStorage.getItem('authUID');
        }

        function saveUser(data) {
            return localStorage.setItem('authUID', JSON.stringify(data));
        }

        function getUser() {
            var defer = $q.defer();
            var data = JSON.parse(localStorage.getItem('authUID'));
            if (data) {
                defer.resolve(data);
            } else {
                defer.reject({error: 'No user found'});
            }
            return defer.promise;
        }

        function logout() {
            var defer = $q.defer();
            localStorage.removeItem('authUID');
            defer.resolve();
            return defer.promise;
        }

        function reloadUser(data) {
            //TODO: Supply user id
            makeRequest('GET', '/v1/user/:id', data);
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
