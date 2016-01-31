(function () {
    'use strict';

    angular
        .module('app')
        .factory('recentService', recentService);

    recentService.$inject = ['$http'];

    function recentService($http) {
        var getRecentUrl     = 'http://localhost:3000/recent';
        var getUserRecentUrl = 'http://localhost:3000/recent/id';
        return {
            getAllRecentActivity:  getAllRecentActivity,
            getUserRecentActivity: getUserRecentActivity
        };


        function getAllRecentActivity() {

            return $http({
                method: 'GET',
                url:    getRecentUrl
            }).then(function (response) {
                return response.data;
            }).catch(function (response) {
                return response.data
            })
        }

        function getUserRecentActivity(userId) {

            return $http({
                method: 'GET',
                url:    getUserRecentUrl,
                params: {id: userId}
            }).then(function (response) {
                return response.data;
            }).catch(function (response) {
                return response.data
            })
        }
    }
})();