(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', 'userService'];

    function LoginCtrl($state, userService) {

        var ctrl = this;
        ctrl.title = 'Login';
        ctrl.login = processLogin;
        ctrl.goToSignUp = goToSignUp;



        activate();

        function activate() {
            console.log('login from the features section');
            //getUsers();
        }

        function processLogin(form) {
            console.log(form);
            var userName = form.userName.$modelValue;
            var password = form.password.$modelValue;
            userService.authorizeUser(userName, password);
        }

        function goToSignUp() {
            console.log('here');
            $state.go('signUp', {}, {reload: true});
        }

        function getUsers() {
            userService.getAllUsers().then(function (response) {
                ctrl.users = response;
            })
        }

    }

})();
