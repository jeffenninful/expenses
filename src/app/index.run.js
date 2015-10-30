(function () {
    'use strict';

    angular
        .module('expenses')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, $rootScope) {
        $log.debug('runBlock end');

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            $rootScope.pageTitle = 'App - ' + toState.title;
        });
    }

})();
