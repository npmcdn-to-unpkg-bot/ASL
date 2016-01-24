(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('HomeCtrl', HomeCtrl);
    
        HomeCtrl.$inject = ['$state', '$window', 'userService'];
    
        function HomeCtrl($state, $window, userService) {
            var ctrl = this;
            var userId = $window.localStorage.getItem('userId');

            ctrl.goToSearch  = goToSearch;
            ctrl.goToProfile = goToProfile;

            activate();

            
            function activate() {
                getProfileInfo();
            }

            function getProfileInfo() {
                userService.getSingleUser(userId).then(function (info) {
                    ctrl.user = info;
                })
            }

            function goToProfile() {
                $state.go('profile')
            }

            function goToSearch() {
                $state.go('search')
            }
        }
})();