(function () {
    'use strict';

    angular
        .module('app')
        .factory('friendService', friendService);

    friendService.$inject = ['$http'];

    function friendService($http) {
        var friendUrl = 'http://localhost:3000/friend';


        return {
            addFriend:     addFriend,
            getAllFriends: getAllFriends,
            removeFriend: removeFriend

        };


        function addFriend(userId, friendId) {

            return $http({
                method: "Post",

                url:    friendUrl,
                params: {
                   userId:   userId,
                    friendId: friendId
                }

            }).then(addFriendSuccess).catch(addFriendError)
        }

        function addFriendSuccess(response) {
            return response.data;
        }

        function addFriendError(response) {
            return response;
        }

        function removeFriend(userId, friendId) {

            return $http({
                method: "Delete",

                url:    friendUrl,
                params: {
                    userId: userId,
                    friendId: friendId
                }

            }).then(removeFriendSuccess).catch(removeFriendError)
        }

        function removeFriendSuccess(response) {
            return response.data;
        }

        function removeFriendError(response) {
            return response;
        }

        /////////////////////////////////////////////

        function getAllFriends(userId) {
            return $http({
                method: "Get",
                url:    friendUrl,
                params: {
                    userId: userId
                }

            }).then(getAllFriendsSuccess).catch(getAllFriendsError)
        }

        function getAllFriendsSuccess(response) {
            return response.data;
        }

        function getAllFriendsError(response) {
            return response;
        }


        function removeFromList(movie, listId) {

            return $http({
                method: "Delete",
                url:    ratingUrl,
                params: {
                    movieId: movie.id,
                    listId:  listId
                }

            }).then(removeFromListSuccess).catch(removeFromListError)
        }

        function removeFromListSuccess(response) {
            return response.data;
        }

        function removeFromListError(response) {
            return response;
        }

    }
})();