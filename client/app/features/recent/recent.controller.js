(function() {
    'use strict';

    angular
        .module('app')
        .controller('RecentHistory', RecentHistory);

        RecentHistory.$inject = ['$scope'];

        function RecentHistory($scope) {
            var ctrl = this;

            activate();

            function activate() {

            }
        }
})();