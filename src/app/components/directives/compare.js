(function () {
    'use strict';

    angular
        .module('expenses')
        .directive('compare', compare);

    /** @ngInject */
    function compare() {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                compare: '='
            },
            link: link
        };

        /**
         * Compare two values
         * @returns {boolean} True if values match and vice versa
         */
        function link(scope, element, attr, ngModel) {
            ngModel.$validators.compare = function (modelValue) {
                return modelValue === scope.compare;
            };
        }
    }
})();
