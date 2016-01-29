(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);
    
        HomeCtrl.$inject = ['$state', '$window', 'listService', 'userService'];
    
        function HomeCtrl($state, $window, listService, userService) {
            var ctrl = this;
            var userId = $window.localStorage.getItem('userId');

            ctrl.goToSearch  = goToSearch;
            ctrl.goToProfile = goToProfile;
            ctrl.movie = movie;
            ctrl.search = search;
            ctrl.goToList = goToList;
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
                $state.go('search', {id: 'movie'});
            }

            function getLists() {

                listService.getAllLists(userId)
                    .then(function (lists) {
                        ctrl.listCollection = lists;
                    })
            }

            function search(searchTerm) {
                $state.go('search', {id: searchTerm});
            }

            function goToList(list) {
                $state.go('list', {id: list.id})
            }
        }
})();