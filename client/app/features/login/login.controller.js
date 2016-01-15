(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$state'];

    function LoginCtrl($state) {

        var ctrl = this;
        ctrl.title = 'Login';
        ctrl.login = processLogin;
        ctrl.goToSignUp = goToSignUp;


        activate();

        function activate() {
            console.log('login from the features section');
        }

        function processLogin(form) {
            console.log(form);
        }

        function goToSignUp() {
            console.log('here');
            $state.go('signUp', {}, {reload: true});
        }
    }

})();
