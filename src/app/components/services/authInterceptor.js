(function () {
  'use strict';

  angular.module('expenses')
    .factory('AuthInterceptor', authInterceptor)
    .config(addInterceptor);

  /** @ngInject */
  function authInterceptor($q, $injector) {

    return {
      responseError: responseError
    };

    function responseError(rejection) {
      if (rejection.status === 401 && rejection.config.url !== "/v1/authorize") {
        var $state = $injector.get('$state');
        $state.go('login');
      }
      return $q.reject(rejection);
    }
  }

  function addInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }

})();
