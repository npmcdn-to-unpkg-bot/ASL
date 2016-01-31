(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);
    
        HomeCtrl.$inject = ['$q', '$state', '$window', 'friendService',  'listService', 'userService'];
    
        function HomeCtrl($q, $state, $window, friendService, listService, userService) {
            var ctrl = this;
            var userId = $window.localStorage.getItem('userId');

            ctrl.goToSearch  = goToSearch;
            ctrl.goToProfile = goToProfile;
            ctrl.movie = movie;
            ctrl.search = search;
            ctrl.goToList = goToList;
            ctrl.goToFriend = goToFriend;
            activate();


            function activate() {
                $q.all([
                    getProfileInfo()
                ]).then(getLists())
                    .then(getFriends())
            }

            function getProfileInfo() {
                userService.getSingleUser(userId).then(function (info) {
                    ctrl.user = info;
                })
            }

            function getFriends() {
                friendService.getAllFriends(userId).then(function (friends) {
                    ctrl.friendCollection = friends;
                })
            }


            function getLists() {

                listService.getAllLists(userId)
                    .then(function (lists) {
                        ctrl.listCollection = lists;
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


            function search(searchTerm) {
                $state.go('search', {id: searchTerm});
            }

            function goToList(list) {
                $state.go('list', {id: list.id})
            }

            function goToFriend(friend) {
                $state.go('friend', {id: friend.id})
            }

        }
})();