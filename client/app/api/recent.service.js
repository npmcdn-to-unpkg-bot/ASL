(function() {
    'use strict';
    
    angular
        .module('app')
        .factory('RecentService', RecentService);
    
        RecentService.$inject = ['$http'];
    
        function RecentService($http) {
            var getRecentUrl = 'http://localhost:3000/recent';
            return {
                getRecent: getRecent
            };


            function getRecent() {

                return $http({
                    method: 'GET',
                    url: getRecentUrl
                }).then(function (response) {
                    console.log(response);
                    return response.data;
                }).catch(function (response) {
                    console.log(response);
                    return response.data
                })
            }
        }
})();