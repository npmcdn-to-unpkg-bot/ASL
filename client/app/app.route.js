(function () {
    'use strict';

    angular.module('app', ['ui.router'])

        .config(
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {
                    url:         '/login',
                    templateUrl: './client/app/features/login/login.html'

                })

                .state('signUp', {
                    url:         '/signUp',
                    templateUrl: './client/app/features/signup/signup.html'

                })

                .state('home', {
                    url:         '/home',
                    templateUrl: './client/app/features/home/home.html'
                })

                .state('search', {
                    url:   '/search/:id',
                    parent: 'home',
                    views: {
                        'pageView@home': {
                            templateUrl: './client/app/features/search/search.html'
                        }
                    }
                })

                .state('profile', {
                    url:    '/profile',
                    parent: 'home',
                    views:  {
                        'pageView@home': {
                            templateUrl: './client/app/features/profile/profile.html'
                        }
                    }
                })

                .state('list', {
                    url:    '/list/:id',
                    parent: 'home',
                    views:  {
                        'pageView@home': {
                            templateUrl: './client/app/features/list/list.html'
                        }
                    }
                });


            $urlRouterProvider.otherwise('/login');

        });

})();