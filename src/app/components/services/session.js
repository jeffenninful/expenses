(function () {
    'use strict';

    angular.module('expenses')
        .factory('Session', session);

    /** @ngInject */
    function session($cookies, $http, $q) {

        return {
            logout: logout,
            isLoggedIn: isLoggedIn,
            getCookie: getCookie,
            setCookie: setCookie,
            deleteCookie: deleteCookie,
            getProfile: getProfile,
            getUserRole: getUserRole,
            updateProfile: updateProfile
        };

        function setCookie(name, value) {
            $cookies.putObject(name, value);
        }

        function getCookie(name) {
            return $cookies.getObject(name);
        }

        function deleteCookie(name) {
            return $cookies.remove(name);
        }

        function getUserRole() {
            var user = this.getCookie('UID');
            return user.profile.role;
        }

        function isLoggedIn() {
            return !!this.getCookie('UID');
        }

        function logout() {
            return makeRequest('POST', 'v1/logout');
        }

        function updateProfile(data) {
            var user = this.getCookie('UID');
            return makeRequest('PUT', '/v1/user/' + user.profile._id, data);
        }

        function getProfile() {
            var defer = $q.defer();
            var user = this.getCookie('UID');

            if (user) {
                defer.resolve(user);

            } else {
                defer.reject();

            }
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
