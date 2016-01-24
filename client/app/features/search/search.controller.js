(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$stateParams', '$window', 'listService', 'movieService', 'ratingService'];

    function SearchCtrl($stateParams, $window, listService, movieService, ratingService) {
        var ctrl     = this;
        var userId   = $window.localStorage.getItem('userId');
        var imageUrl = "http://image.tmdb.org/t/p/w500/";

        var movieArray    = [];
        ctrl.save         = save;
        ctrl.selectedList = '';
        ctrl.user         = {};

        activate();


        function activate() {
            getLists();

            switch ($stateParams.id) {
                case 'movie':
                    popularMovie();
                    ctrl.title = "Movies -";
                    break;

                case 'tv':
                    ctrl.title = "TV Shows -";
                    getTopRatedTv();
                    break;

                case 'theaters':
                    ctrl.title = "Movies - Now Playing";
                    getNowPlaying();
                    break;

                case 'upcoming':
                    ctrl.title = 'Coming Soon';
                    getUpcoming();
                    break;

                default:
                    ctrl.title = "Search Results";
                    search($stateParams.id);

            }

        }

        function getLists() {

            listService.getAllLists(userId)
                .then(function (lists) {
                    ctrl.listCollection = lists;
                })
        }

        function getNowPlaying() {
            movieService.fetchNowPlaying().then(function (movieCollection) {

                movieCollection.results.forEach(function (movie) {
                    if (movie.poster_path != null) {
                        movie.poster_path = imageUrl + movie.poster_path;
                        movieArray.push(movie)
                    }

                    ctrl.movieCollection = movieArray;
                })
            })
        }

        function popularMovie() {
            var movieArray = [];
            movieService.fetchMovieByPopularity().then(function (movieCollection) {

                movieCollection.results.forEach(function (movie) {
                    if (movie.poster_path != null) {
                        movie.poster_path = imageUrl + movie.poster_path;
                        movieArray.push(movie)
                    }


                    ctrl.movieCollection = movieArray;
                })
            })
        }

        function save(movie) {
            var rating    = {};
            rating.showId = movie.id;
            rating.userId = userId;
            rating.listId = ctrl.selectedList.id;
            rating.rating = ctrl.user.rating;

            ratingService.saveRating(rating)

        }

        function search(searchTerm) {
            movieService.fetchSearch(searchTerm).then(function (collection) {

                collection.results.forEach(function (movie) {
                    if (movie.poster_path != null) {
                        movie.poster_path = imageUrl + movie.poster_path;
                        movieArray.push(movie)
                    }

                });
                ctrl.movieCollection = movieArray;
            });
        }

        function getTopRatedTv() {
            movieService.fetchTopRatedTv().then(function (tvCollection) {

                tvCollection.results.forEach(function (tv) {
                    if (tv.poster_path != null) {
                        tv.poster_path = imageUrl + tv.poster_path;
                        movieArray.push(tv)
                    }
                    ctrl.movieCollection = movieArray;
                })
            })
        }

        function getUpcoming() {
            movieService.fetchUpcoming().then(function (movieCollection) {

                movieCollection.results.forEach(function (movie) {
                    if (movie.poster_path != null) {
                        movie.poster_path = imageUrl + movie.poster_path;
                        movieArray.push(movie)
                    }

                    ctrl.movieCollection = movieArray;
                })
            })
        }

    }
})
();