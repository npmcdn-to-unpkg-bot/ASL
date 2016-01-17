(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', '$window', 'userService'];

    function ProfileCtrl($scope, $window, userService) {
        var ctrl   = this;
        var userId = $window.localStorage.getItem('userId');

        ctrl.updateUser = updateUser;
        ctrl.user       = {};

        activate();

        function activate() {

            getProfileInfo();

        }

        function getProfileInfo() {
            userService.getSingleUser(userId).then(function (info) {
                ctrl.user = info;
            })
        }

        function updateUser(user) {
            user.id = userId;
            userService.updateUserInformation(user).then(function (response) {
                console.log(response);
            })
        }
    }
})();