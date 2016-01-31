(function () {
    "use strict";

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http'];

    function userService($http) {
        var allUsersUrl   = 'http://localhost:3000/user';
        var singleUserUrl = 'http://localhost:3000/user/id';
        var getAllUsersUrl = 'http://localhost:3000/users';

        return {
            addUser:               addUser,
            authorizeUser:         authorizeUser,
            getAllUsers:           getAllUsers,
            getSingleUser:         getSingleUser,
            updateUserInformation: updateUserInformation

        };


        ////////////////////////////////////////


        function addUser(newUser) {


            return $http({
                method: "Post",
                url:    allUsersUrl,
                params: {
                    user_name:  newUser.userName,
                    password:   newUser.password,
                    first_name: newUser.firstName,
                    last_name:  newUser.lastName,
                    email:      newUser.email
                }

            }).then(addUserSuccess).catch(addUserError)
        }

        function addUserSuccess(response) {
            return response;
        }

        function addUserError(response) {
            return response;
        }

        ////////////////////////////////////////

        function authorizeUser(userName, password) {

            return $http({
                method: "GET",
                url:    allUsersUrl,
                params: {
                    userName: userName,
                    password: password
                }

            }).then(authroizeUserSuccess).catch(authroizeUserError)
        }

        function authroizeUserSuccess(response) {
            return response;
        }

        function authroizeUserError(response) {
            return response;
        }

        ////////////////////////////////////////

        function getAllUsers() {
            return $http({
                method:   'GET',
                url: getAllUsersUrl,
                dataType: 'json',
                headers:  {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                }

            }).then(getAllUsersSuccess).catch(getAllUsersError);
        }


        function getAllUsersSuccess(response) {
            return response.data;
        }


        function getAllUsersError(response) {
            return response;
        }

        ////////////////////////////////////////

        function getSingleUser(userId) {

            return $http({
                method:   'GET',
                url:      singleUserUrl,
                dataType: 'json',
                headers:  {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                params:   {
                    id: userId
                }

            }).then(getSingleUserSuccess).catch(getSingleUserError);
        }


        function getSingleUserSuccess(response) {
            return response.data[0];
        }


        function getSingleUserError(response) {
            return response;
        }

        ////////////////////////////////////////


        function updateUserInformation(user) {
            return $http({
                method: "PATCH",
                url:    singleUserUrl,
                params: {
                    userName:  user.user_name,
                    firstName: user.first_name,
                    lastName:  user.last_name,
                    email:     user.email,
                    id:        user.id
                }

            }).then(updateUserInformationSuccess).catch(updateUserInformationError)
        }

        function updateUserInformationSuccess(response) {
            return response;
        }

        function updateUserInformationError(response) {
            return response;
        }


    }

})();