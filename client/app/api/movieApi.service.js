(function () {
    'use strict';

    angular
        .module('app')
        .factory('movieService', movieService);

    movieService.$inject = ['$http'];

    function movieService($http) {
        var baseUrl = 'https://api.themoviedb.org/3';
        var apiKey  = 'f9247439cf8df1cf68203b474a72a50f';


        return {
            fetchGenreList:         fetchGenreList,
            fetchMovieByPopularity: fetchMovieByPopularity,
        };


        function fetchGenreList() {
            var url = '/genre/movie/list';
            return $http({
                method:  "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                url:     baseUrl + url,

                params: {
                    api_key: apiKey
                }

            }).then(fetchGenreListSuccess).catch(fetchGenreListError)
        }

        function fetchGenreListSuccess(response) {
            console.log(response);
            return response.data;
        }

        function fetchGenreListError(response) {
            console.log(response);
            return response;
        }

        ///////////////////////////////////////////////////

        function fetchMovieByPopularity() {
            var url = '/discover/movie';
            return $http({
                method:  "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                url:     baseUrl + url,

                params: {
                    api_key: apiKey
                }

            }).then(fetchMovieByPopularitySuccess).catch(fetchMovieByPopularityError)
        }

        function fetchMovieByPopularitySuccess(response) {
            console.log(response);
            return response.data;
        }

        function fetchMovieByPopularityError(response) {
            console.log(response);
            return response;
        }

    }


})();