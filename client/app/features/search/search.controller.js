(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$stateParams', '$window', 'listService', 'movieService', 'ratingService'];

    function SearchCtrl($stateParams, $window, listService, movieService, ratingService) {
        var ctrl     = this;
        var userId   = $window.localStorage.getItem('userId');
        var imageUrl = "http://image.tmdb.org/t/p/w300/";

        ctrl.save         = save;
        ctrl.selectedList = '';
        ctrl.user = {};

        activate();


        function activate() {
            //popularMovie();
            genreList();
            getLists();

            console.log($stateParams.id);
            switch ($stateParams.id) {
                case 'movie':
                    console.log('get most recent movie');
                    ctrl.title = "Movies -";
                    break;

                case 'tv':
                    console.log('Get TV SHOWS');
                    ctrl.title = "TV Shows -";
                    getTopRatedTv();
                    break;

                case 'theaters':
                    console.log('get movies in theaters');
                    ctrl.title = "Movies - Now Playing";

                    getNowPlaying();
                    break;

                case 'popular':
                    ctrl.title = "Most Popular Movies";

                    popularMovie()
            }

        }

        function genreList() {
            movieService.fetchGenreList().then(function (genreCollection) {
                ctrl.genereCollection = genreCollection.genres;
            })

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
                    movie.poster_path = imageUrl + movie.poster_path;
                });

                ctrl.movieCollection = movieCollection.results;
            })
        }

        function popularMovie() {
            movieService.fetchMovieByPopularity().then(function (movieCollection) {

                movieCollection.results.forEach(function (movie) {
                    movie.poster_path = imageUrl + movie.poster_path;
                });

                ctrl.movieCollection = movieCollection.results;
            })
        }

        function save(movie) {
            console.log(ctrl.user.rating);
            var rating    = {};
            rating.showId = movie.id;
            rating.userId = ctrl.selectedList.userId;
            rating.listId = ctrl.selectedList.id;
            rating.rating = ctrl.user.rating;


            ratingService.saveRating(rating);

        }

        function getTopRatedTv() {
            movieService.fetchTopRatedTv().then(function (tvCollection) {
                console.log(tvCollection);

                tvCollection.results.forEach(function (tv) {
                    tv.poster_path = imageUrl + tv.poster_path;
                });

                ctrl.movieCollection = tvCollection.results;


            })
        }


    }
})();