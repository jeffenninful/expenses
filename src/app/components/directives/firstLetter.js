(function () {
    'use strict';

    angular
        .module('expenses')
        .filter('firstLetter', firstLetter);

    /** @ngInject */
    function firstLetter() {
        return function (input) {
            if (input) {
                var first = input.charAt(0).toUpperCase();
                return first + input.slice(1, input.length);
            } else {
                return input;
            }
        };
    }
})();
