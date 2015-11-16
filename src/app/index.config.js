(function () {
    'use strict';

    angular
        .module('expenses')
        .config(config);

    /** @ngInject */
    function config($logProvider, $httpProvider) {

        $logProvider.debugEnabled(true);

        $httpProvider.interceptors.push('AuthInterceptor');

    }

})();
