(function () {
    'use strict';

    angular
        .module('app')
        .controller('listCtrl', listCtrl);

    listCtrl.$inject = ['$state', '$stateParams', '$window', 'listService', 'movieService', 'ratingService'];

    function listCtrl($state, $stateParams, $window, listService, movieService, ratingService) {
        var ctrl     = this;
        var userId   = $window.localStorage.getItem('userId');
        var imageUrl = "http://image.tmdb.org/t/p/w500/";

        var movieArray    = [];
        ctrl.save         = save;
        ctrl.remove       = remove;
        ctrl.selectedList = '';
        ctrl.user         = {};
        var listId        = $stateParams.id;

        activate();


        function activate() {
            getLists();
            getRating();
        }

        function getLists() {

            listService.getAllLists(userId)
                .then(function (lists) {
                    ctrl.listCollection = lists;

                    ctrl.listCollection.forEach(function (list) {

                        if(list.id == listId){
                            ctrl.title = list.list_name;
                        }
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

        function getRating() {
            ratingService.getRating(listId).then(function (ratingCollection) {
                ratingCollection.data.forEach(function (rating) {

                    movieService.fetchMovie(rating.show_id).then(function (movie) {
                            if (movie.poster_path != null) {
                                movie.poster_path = imageUrl + movie.poster_path;
                                movieArray.push(movie)
                            }

                        ctrl.movieCollection = movieArray;
                    })
                })
            })

        }

        function remove(movie) {
            ratingService.removeFromList(movie, listId).then(function (response) {
                $state.go('list', {id: listId}, {reload:true});
            })
        }
    }
})
();