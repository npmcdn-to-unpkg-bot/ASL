(function () {
    'use strict';

    angular.module('app.route', ['ngRoute'])

    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider

                .when('/login', {
                    templateUrl: './client/app/features/login/login.html'
                })
                .when('/signup', {
                    templateUrl: './client/app/features/signup/signup.html'
                })

        }])
})();