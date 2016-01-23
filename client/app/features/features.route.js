(function () {
    'use strict';

    angular.module('app', ['ui.router'])

    .config(
        function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/home');

            $stateProvider
                .state('home', {
                    url:         '/home',
                    templateUrl: './client/app/features/home/home.html'
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