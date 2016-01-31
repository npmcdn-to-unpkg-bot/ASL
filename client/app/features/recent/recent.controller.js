(function () {
    'use strict';

    angular
        .module('app')
        .controller('RecentHistory', RecentHistory);

    RecentHistory.$inject = ['movieService', 'recentService'];

    function RecentHistory(movieService, recentService) {
        var ctrl     = this;
        var imageUrl = "http://image.tmdb.org/t/p/w500/";

        activate();

        function activate() {
            getRecentActivity();
        }

        function getRecentActivity() {
            RecentService.getAllRecentActivity().then(function (histories) {


                histories.forEach(function (entry) {

                    movieService.fetchMovie(entry.show_id).then(function (movie) {
                        if (movie.poster_path != null) {
                            movie.poster_path = imageUrl + movie.poster_path;
                            entry.movie       = movie;
                            entry.posterPath  = movie.poster_path;
                        }
                    })
                });

                ctrl.activity = histories;

                console.log(ctrl.activity);
            })
        }
    }
})();