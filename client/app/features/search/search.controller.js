(function () {
    'use strict';

    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$window', 'listService', 'movieService', 'ratingService'];

    function SearchCtrl($window, listService, movieService, ratingService) {
        var ctrl     = this;
        var userId   = $window.localStorage.getItem('userId');
        var imageUrl = "http://image.tmdb.org/t/p/w300/";

        ctrl.save         = save;
        ctrl.selectedList = '';
        console.log(ctrl.selectedList);
        activate();

        function activate() {
            popularMovie();
            genreList();
            getLists();
        }

        function genreList() {
            movieService.fetchGenreList().then(function (genreCollection) {
                ctrl.genereCollection = genreCollection.genres;
                console.log(ctrl.genereCollection);
            })

        }

        function popularMovie() {
            movieService.fetchMovieByPopularity().then(function (movieList) {

                movieList.results.forEach(function (movie) {
                    movie.poster_path = imageUrl + movie.poster_path;
                });

                ctrl.movieCollection = movieList.results;
            })
        }

        function getLists() {

            listService.getAllLists(userId)
                .then(function (lists) {
                    console.log(lists);
                    ctrl.listCollection = lists;
                })
        }

        function save(movie) {
            console.log(ctrl.selectedList);
            console.log(movie);
            var rating    = {};
            rating.showId = movie.id;
            rating.userId = ctrl.selectedList.userId;
            rating.listId = ctrl.selectedList.id;

            ratingService.saveRating(rating);

        }


    }
})();