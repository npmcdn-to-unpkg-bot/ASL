(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$state','userService'];

    function SignUpCtrl($state, userService) {
        var ctrl = this;

        ctrl.title = 'GoodViews';

        activate();

        function activate() {

        }

        ctrl.signUp = signUp;

        function signUp(form) {
            var newUser = {};
            newUser     = {
                userName:  form.userName.$modelValue,
                password:  form.password.$modelValue,
                firstName: form.firstName.$modelValue,
                lastName:  form.lastName.$modelValue,
                email:     form.email.$modelValue,

            };
            console.log('newUser: ', newUser);

            userService.addUser(newUser).then(function (response) {
                $state.go('login')
            })
        }


    }
})();
