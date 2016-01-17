(function () {
    'use strict';

    angular.module('app.route', ['ngRoute'])

    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider

                .when('/login', {
                    templateUrl: './client/app/features/login/login.html'
                })

                .when('/signUp', {
                    state: 'signup',
                    templateUrl: './client/app/features/signup/signup.html'
                })
                .when('/profile', {
                    state:       'profile',
                    templateUrl: './client/app/features/profile/profile.html'
                })


        }])
})();