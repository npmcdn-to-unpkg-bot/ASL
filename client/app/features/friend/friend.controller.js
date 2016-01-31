(function() {
    'use strict';

    angular
        .module('app')
        .controller('FriendCtrl', FriendCtrl);

        FriendCtrl.$inject = ['$q','$state', '$stateParams', '$window', 'friendService', 'listService', 'userService'];

        function FriendCtrl($q, $state, $stateParams, $window, friendService, listService, userService) {
            var ctrl = this;
            var userId = $window.localStorage.getItem('userId');
            var friendId = $stateParams.id;


            ctrl.add = add;
            ctrl.remove = remove;

            $q.all({
                friend: userService.getSingleUser(friendId),
                lists: listService.getAllLists(friendId)
            }).then(activate);



            function activate(data) {
                ctrl.friend = data.friend;
                ctrl.lists = data.lists;
            }
            getAllUsers();

            function getAllUsers() {
                userService.getAllUsers().then(function (users) {
                    ctrl.users = users;
                })
            }


            function add(user) {

                friendService.addFriend(userId, user.id).then(function (friend) {
                    $state.go('friends', {}, {reload:true});

                })
            }

            function remove(user) {
                friendService.removeFriend(userId, user.id).then(function (friend) {
                    $state.go('friends', {}, {reload:true})
                })
            }


            getAllFriends();
            function getAllFriends() {
                friendService.getAllFriends(userId).then(function (friends) {
                    ctrl.friends = friends;
                })
            }

        }
})();
