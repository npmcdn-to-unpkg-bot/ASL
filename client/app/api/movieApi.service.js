(function() {
    'use strict';

    angular
        .module('app')
        .factory('movieService', movieService);

        movieService.$inject = ['$http'];

        function movieService($http) {
            var baseUrl = 'https://api.themoviedb.org/3';
            var apiKey = 'f9247439cf8df1cf68203b474a72a50f';


                return {
                    fetchGenreList: fetchGenreList
                };


            function fetchGenreList() {
                var url = '/genre/movie/list';
                return $http({
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept':       'application/json'
                    },
                    url: baseUrl + url,

                    params:{
                        api_key: apiKey
                    }

                }).then(fetchMostPopularMoviesSuccess).catch(fetchMostPopularMoviesError)
            }

            function fetchMostPopularMoviesSuccess(response) {
                console.log(response);
                return response.data;
            }

            function fetchMostPopularMoviesError(response) {
                console.log(response);
                return response;
            }
        }
})();