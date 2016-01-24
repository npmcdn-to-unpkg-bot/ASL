(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);
    
        HomeCtrl.$inject = ['$state', '$window', 'listService', 'movieService', 'userService'];
    
        function HomeCtrl($state, $window, listService, movieService, userService) {
            var ctrl = this;
            var userId = $window.localStorage.getItem('userId');

            ctrl.goToSearch  = goToSearch;
            ctrl.goToProfile = goToProfile;
            ctrl.movie = movie;
            activate();

            
            function activate() {
                getProfileInfo();
                getLists();
            }

            function getProfileInfo() {
                userService.getSingleUser(userId).then(function (info) {
                    ctrl.user = info;
                })
            }

            function goToProfile() {
                $state.go('profile')
            }

            function goToSearch(type) {
                $state.go('search', {id: type})
            }


            function movie() {
                console.log('go to movie');
                $state.go('search', {id: 'movie'});
            }

            function getLists() {

                listService.getAllLists(userId)
                    .then(function (lists) {
                        ctrl.listCollection = lists;
                    })
            }





        }
})();