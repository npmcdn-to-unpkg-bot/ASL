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
        console.log(ctrl.selectedList);
        activate();

        function activate() {
            //popularMovie();
            genreList();
            getLists();

            console.log($stateParams.id);
            switch ($stateParams.id){
                case 'movie':
                    console.log('get most recent movie');
                    break;

                case 'tv':
                    console.log('Get TV SHOWS');
                    break;

                case 'theaters':
                    console.log('get movies in theaters');
                    break;

                case 'popular':
                    popularMovie()
            }

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
                    ctrl.listCollection = lists;
                })
        }

        function save(movie) {
            var rating    = {};
            rating.showId = movie.id;
            rating.userId = ctrl.selectedList.userId;
            rating.listId = ctrl.selectedList.id;

            ratingService.saveRating(rating);

        }





    }
})();