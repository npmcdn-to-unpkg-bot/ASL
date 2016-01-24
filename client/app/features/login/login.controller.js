(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state', '$window', 'userService'];

    function LoginCtrl($state, $window, userService) {

        var ctrl = this;
        ctrl.title = 'Login';
        ctrl.login = processLogin;
        ctrl.goToSignUp = goToSignUp;



        activate();

        function activate() {
            console.log('login from the features section');
        }

        function processLogin(form) {
            var userName = form.userName.$modelValue;
            var password = form.password.$modelValue;
            userService.authorizeUser(userName, password).then(function (userInfo) {
                ctrl.incorrect = true;

                if(userInfo.status === 200){
                    $window.localStorage.setItem('userId', userInfo.data[0].id);
                    $state.go('home');
                }
            });
        }

        function goToSignUp() {
            console.log('here');
            $state.go('signUp', {}, {reload: true});
        }


    }

})();
