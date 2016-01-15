(function () {
    'use strict';

    angular
        .module('app')
        .controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = [];

    function SignUpCtrl() {
        var ctrl = this;

        ctrl.title = 'GoodViews';

        activate();

        function activate() {

        }
    }
})();
