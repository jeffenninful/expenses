(function () {
    'use strict';

    angular.module('expenses')
        .factory('Session', session);

    /** @ngInject */
    function session($http, $q) {

        return {
            getProfile: getProfile,
            reloadProfile: reloadProfile,
            updateProfile: updateProfile,
            logout: logout,
            isLoggedIn: isLoggedIn,
            saveProfile: saveProfile
        };

        function isLoggedIn() {
            return !!localStorage.getItem('authUID');
        }

        function saveProfile(data) {
            return this.getProfile().then(function (response) {
                delete response.profile;
                response.profile = data.profile;
                return localStorage.setItem('authUID', JSON.stringify(response));
            }, function () {
                return localStorage.setItem('authUID', JSON.stringify(data));
            });
        }

        function getProfile() {
            var defer = $q.defer();
            var data = JSON.parse(localStorage.getItem('authUID'));
            if (data) {
                defer.resolve(data);
            } else {
                defer.reject();
            }
            return defer.promise;
        }

        function logout() {
            var defer = $q.defer();
            localStorage.removeItem('authUID');
            defer.resolve();
            return defer.promise;
        }

        function reloadProfile() {
            return this.getProfile().then(function (response) {
                var id = response.profile._id;
                return makeRequest('GET', '/v1/user/' + id);
            });
        }

        function updateProfile(data) {
            return this.getProfile().then(function (response) {
                var id = response.profile._id;
                return makeRequest('PUT', '/v1/user/' + id, data);
            });
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
