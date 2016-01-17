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
                console.log(userInfo.data[0]);
                $window.localStorage.setItem('userId', userInfo.data[0].id);

                if(userInfo.status === 200){
                    $state.go('profile');
                }
            });
        }

        function goToSignUp() {
            console.log('here');
            $state.go('signUp', {}, {reload: true});
        }


    }

})();
