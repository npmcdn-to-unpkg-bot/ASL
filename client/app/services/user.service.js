
(function () {
    'use strict';

    angular
        .module('app')
        .factory('localStorage', localStorage);

    localStorage.$inject = ['$window'];

    function localStorage($window) {
        var store;

        var service = {
            add:    add,
            get:    get,
            remove: remove
        };

        activate();

        return service;

        ////////////////////////////////////////

        function activate() {
            store = $window.localStorage;
        }

        function add(key, value) {
            value = angular.toJson(value);
            store.setItem(key, value);
        }

        function get(key) {
            var value = store.getItem(key);

            if (value) {
                value = angular.fromJson(value);
            }

            return value;
        }

        function remove(key) {
            store.removeItem(key);
        }

        function something() {
            
        }
    }

})();
