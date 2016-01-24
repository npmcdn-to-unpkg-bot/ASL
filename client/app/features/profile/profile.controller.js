(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$state', '$window', 'userService'];

    function ProfileCtrl($state, $window, userService) {
        var ctrl   = this;
        var userId = $window.localStorage.getItem('userId');

        ctrl.updateUser = updateUser;
        ctrl.user       = {};
        ctrl.add = add;
        ctrl.remove = remove;
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
            userService.updateUserInformation(user).then(function () {
                $state.go('profile', {}, {reload:true});
            })
        }

        function add() {
            console.log('add');
        }

        function remove(list) {
            console.log('remove');
        }
    }
})();