(function () {
    'use strict';

    angular.module('app', ['ui.router'])

    .config(
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/login');

            $stateProvider
                .state('login', {
                    url:         '/login',
                    templateUrl: './client/app/features/login/login.html'
                })

                .state('signUp', {
                    url:         '/signUp',
                    templateUrl: './client/app/features/signup/signup.html'
                })
                .state('profile', {
                    url:         '/profile',
                    templateUrl: './client/app/features/profile/profile.html'
                })
                .state('search', {
                    url:         '/search',
                    templateUrl: './client/app/features/profile/profile.html'
                })
                .state('list', {
                    url:         '/list',
                    templateUrl: './client/app/features/profile/profile.html'
                })
        });

})();