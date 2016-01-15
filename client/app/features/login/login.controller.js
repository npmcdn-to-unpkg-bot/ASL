(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [];

    function LoginCtrl() {

        var ctrl = this;
        ctrl.title = 'Login';
        activate();

        function activate() {
            console.log('login from the features section');
        }
    }
})();
