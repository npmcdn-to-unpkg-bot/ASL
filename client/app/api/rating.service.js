(function () {
    'use strict';

    angular
        .module('app')
        .factory('ratingService', ratingService);

    ratingService.$inject = ['$http'];

    function ratingService($http) {
        var ratingUrl = 'http://localhost:3000/rating';


        return {
            saveRating:     saveRating,
            getRating:      getRating,
            removeFromList: removeFromList
        };


        function saveRating(rating) {

            return $http({
                method:  "Post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                url:     ratingUrl,
                params:  {
                    userId: rating.userId,
                    showId: rating.showId,
                    listId: rating.listId || '',
                    rating: rating.rating || '1'
                }

            }).then(saveRatingSuccess).catch(saveRatingError)
        }

        function saveRatingSuccess(response) {
            return response.data;
        }

        function saveRatingError(response) {
            return response;
        }

        /////////////////////////////////////////////

        function getRating(listId) {
            return $http({
                method:  "Get",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                url:     ratingUrl,
                params:  {
                    listId: listId
                }

            }).then(getRatingSuccess).catch(getRatingError)
        }

        function getRatingSuccess(response) {
            return response;
        }

        function getRatingError(response) {
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