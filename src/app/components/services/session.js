(function () {
  'use strict';

  angular.module('expenses')
    .factory('Session', session);

  /** @ngInject */
  function session($http, $q) {

    var loginCookie = "loginCookie";

    return {
      getUser: getUser
    };

    function getUser(data) {
      return makeRequest('GET', '/v1/user', data);
    }


    function isLoggedIn() {
      getCookieInfo(loginCookie);
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

    function setCookie(key, value) {
      document.cookie = key + "=" + value + ";expires=Thu, 18 Dec 2015 12:00:00 UTC; path=/";
    }


    function getCookieInfo(key) {
      var found = {
        name: "",
        value: ""
      };
      var cookie = getCookie() || [];
      cookie.split(';').filter(function (item) {
        var each = item.trim().split('=');
        if (each[0] === key) {
          found.name = each[0];
          found.value = each[1];
        }
      });

      return found;
    }

  }
})();
