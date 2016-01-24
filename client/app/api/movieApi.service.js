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
            fetchTopRatedTv:        fetchTopRatedTv,
            fetchNowPlaying:        fetchNowPlaying,
            fetchSearch:            fetchSearch,
            fetchUpcoming:          fetchUpcoming
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
            return response.data;
        }

        function fetchGenreListError(response) {
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
            return response.data;
        }

        function fetchMovieByPopularityError(response) {
            return response;
        }

        ///////////////////////////////////////////////////

        function fetchTopRatedTv() {
            var url = '/tv/popular';
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

            }).then(fetchTopRatedTvSuccess).catch(fetchTopRatedTvError)
        }

        function fetchTopRatedTvSuccess(response) {
            return response.data;
        }

        function fetchTopRatedTvError(response) {
            return response;
        }


        function fetchNowPlaying() {
            var url = '/movie/now_playing';
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

            }).then(fetchNowPlayingSuccess).catch(fetchNowPlayingError)
        }

        function fetchNowPlayingSuccess(response) {
            return response.data;
        }

        function fetchNowPlayingError(response) {
            return response;
        }

        function fetchSearch(search) {
            var url = '/search/multi';
            return $http({
                method:  "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                url:     baseUrl + url,

                params: {
                    api_key: apiKey,
                    query:   search
                }

            }).then(fetchSearchSuccess).catch(fetchSearchError)
        }

        function fetchSearchSuccess(response) {
            return response.data;
        }

        function fetchSearchError(response) {
            return response;
        }

        function fetchUpcoming(search) {
            var url = '/movie/upcoming';
            return $http({
                method:  "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                url:     baseUrl + url,

                params: {
                    api_key: apiKey,
                }

            }).then(fetchUpcomingSuccess).catch(fetchUpcomingError)
        }

        function fetchUpcomingSuccess(response) {
            return response.data;
        }

        function fetchUpcomingError(response) {
            return response;
        }
    }


})();