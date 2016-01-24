(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$q', '$state', '$window', 'listService', 'userService'];

    function ProfileCtrl($q, $state, $window, listService, userService) {
        var ctrl   = this;
        var userId = $window.localStorage.getItem('userId');

        ctrl.updateUser  = updateUser;
        ctrl.user        = {};
        ctrl.add         = add;
        ctrl.remove      = remove;
        ctrl.newListName = '';
        activate();

        function activate() {
            $q.all([
                getProfileInfo(),
                getLists()
            ])

        }

        function getProfileInfo() {
            userService.getSingleUser(userId).then(function (info) {
                ctrl.user = info;
            })
        }

        function updateUser(user) {
            user.id = userId;
            userService.updateUserInformation(user).then(function () {
                $state.go('profile', {}, {reload: true});
            })
        }

        function getLists() {

            listService.getAllLists(userId)
                .then(function (lists) {
                    ctrl.listCollection = lists;
                })
        }

        function add(list) {
            listService.addList(list, userId)
                .then(function () {
                    $state.go('profile', {}, {reload: true});
                });
        }

        function remove(list) {
            listService.removeList(list.id)
                .then(function (response) {
                $state.go('profile', {}, {reload: true});
                })
        }


    }
})();