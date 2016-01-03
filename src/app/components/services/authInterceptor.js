(function () {
    'use strict';

    angular.module('expenses')
        .factory('AuthInterceptor', authInterceptor);

    /** @ngInject */
    function authInterceptor($q, $injector) {

        return {
            request: request,
            responseError: responseError
        };

        function request(config) {
            var session = $injector.get('Session');
            var token = session.getCookie('UID') ? session.getCookie('UID').token : '';
            config.headers['x-access-token'] = token;
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401 && rejection.config.url !== "/v1/authorize") {
                var $state = $injector.get('$state');
                var session = $injector.get('Session');
                session.deleteCookie('UID');

                $state.go('register');
            }
            return $q.reject(rejection);
        }
    }

})();
