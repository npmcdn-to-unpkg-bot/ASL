(function () {
    "use strict";

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var userUrl        = 'http://localhost:3000/users';
        var getAllUsersUrl = 'http://localhost:3000/users';

        return {
            addUser:               addUser,
            authorizeUser:         authorizeUser,
            getAllUsers:           getAllUsers,
            updateUserInformation: updateUserInformation

        };


        ////////////////////////////////////////


        function addUser(newUser) {

            console.log('newUser api call: ', newUser);

            return $http({
                method: "Post",
                url:    userUrl,
                params: {
                    user_name: newUser.userName,
                    password: newUser.password,
                    first_name: newUser.firstName,
                    last_name: newUser.lastName,
                    email: newUser.email
                }

            }).then(addUserSuccess).catch(addUserError)
        }

        function addUserSuccess(response) {
            console.log(response);
            return response;
        }

        function addUserError(response) {
            console.log(response);
            return response;
        }

        ////////////////////////////////////////

        function authorizeUser(userName, password) {

            return $http({
                method: "GET",
                url:    userUrl,
                params: {
                    userName: userName,
                    password: password
                }

            }).then(authroizeUserSuccess).catch(authroizeUserError)
        }

        function authroizeUserSuccess(response) {
            console.log(response);
            return response;
        }

        function authroizeUserError(response) {
            console.log(response);
            return response;
        }

        ////////////////////////////////////////

        function getAllUsers() {

            return $http({
                method:   'GET',
                url:      getAllUsersUrl,
                dataType: 'json',
                headers:  {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                }

            }).then(getAllUsersSuccess).catch(getAllUsersError);
        }


        function getAllUsersSuccess(response) {
            console.log(response);
            return response.data;
        }


        function getAllUsersError(response) {
            console.log(response);
            return response;
        }

        ////////////////////////////////////////


        function updateUserInformation() {
            return $http({
                method: "Update",
                url:    userUrl

            }).then(updateUserInformationSuccess).catch(updateUserInformationError)
        }

        function updateUserInformationSuccess(response) {
            console.log(response);
            return response;
        }

        function updateUserInformationError(response) {
            console.log(response);
            return response;
        }


    }

})();