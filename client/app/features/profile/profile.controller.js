(function () {
    'use strict';

    angular
        .module('app')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$state', '$window', 'listService', 'userService'];

    function ProfileCtrl($state, $window, listService, userService) {
        var ctrl   = this;
        var userId = $window.localStorage.getItem('userId');

        ctrl.updateUser  = updateUser;
        ctrl.user        = {};
        ctrl.add         = add;
        ctrl.remove      = remove;
        ctrl.newListName = '';
        activate();

        function activate() {
            getLists();
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
                $state.go('profile', {}, {reload: true});
            })
        }

        function getLists() {
            var listArray       = [{listName: 1}, {listName: 2}, {listName: 3}];
            ctrl.listCollection = listArray;
        }

        function add(list) {

            console.log('add', list);
            //listService.addList(list)
        }

        function remove(list) {
            console.log('remove', list);
            //listService.remove();
        }


    }
})();