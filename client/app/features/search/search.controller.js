(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('SearchCtrl', SearchCtrl);
    
        SearchCtrl.$inject = ['$scope', 'movieService'];
    
        function SearchCtrl($scope, movieService) {
            var ctrl = this;
            
            activate();
            
            function activate() {

            }

            function genreList() {
                movieService.fetchGenreList().then(function (response) {
                    console.log(response);


                })
            }



        }
})();