(function () {
    'use strict';

    angular
        .module('UserCtrl')
        .controller('UserCtrl', UserCtrl);

    UserCtrl.$inject = ['$scope'];

    function UserCtrl($scope) {
        var ctrl = this;

        activate();

        function activate() {

        }
    }
})();



