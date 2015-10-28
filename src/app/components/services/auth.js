(function () {
  'use strict';

  angular.module('expenses')
    .factory('Auth', auth);

  /** @ngInject */
  function auth($http, $q) {

    //var loginCookie = "loginCookie";

    return {
      login: login,
      register: register
    };

    function login(data) {
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/v1/authorize',
        data: angular.toJson(data)
      }).then(function (response) {
        $http.defaults.headers.common['x-access-token'] = response.data.token;
        deferred.resolve(response.data);
      }, function (error) {
        deferred.reject(error.data);
      });
      return deferred.promise;
    }


    function register(data) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        url: '/v1/register',
        data: angular.toJson(data)
      }).then(function (response) {
        $http.defaults.headers.common['x-access-token'] = response.data.token;
        deferred.resolve(response.data);
      }, function (error) {
        deferred.reject(error.data);
      });

      return deferred.promise;
    }

  }
})();
