(function () {
    'use strict';

    angular
        .module('app')
        .factory('ratingService', ratingService);

    ratingService.$inject = ['$http'];

    function ratingService($http) {
        var saveRatingUrl = 'http://localhost:3000/rating';


        return {
            saveRating: saveRating
        };


        function saveRating(rating) {
            console.log(rating);
            return $http({
                method:  "Post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                url:     saveRatingUrl,
                params:  {
                    userId: rating.userId,
                    showId: rating.showId,
                    listId: rating.listId,
                    notes:  ' '

                }

            }).then(saveRatingSuccess).catch(saveRatingError)
        }

        function saveRatingSuccess(response) {
            console.log(response);
            return response.data;
        }

        function saveRatingError(response) {
            console.log(response);
            return response;
        }
    }
})();