(function () {
    "use strict";

    angular
        .module('app')
        .factory('listService', listService);

    listService.$inject = ['$http'];

    function listService($http) {
        var allListsUrl   = 'http://localhost:3000/list';
        var singleListUrl = 'http://localhost:3000/list/id';

        return {
            addList:       addList,
            getAllLists:   getAllLists,
            getSingleList: getSingleList,
            updateList:    updateList

        };


        ////////////////////////////////////////


        function addList(newList, userId) {


            return $http({
                method: "Post",
                url:    allListsUrl,
                params: {
                    list_name: newList,
                    userId:    userId
                }

            }).then(addListSuccess).catch(addListError)
        }

        function addListSuccess(response) {
            return response;
        }

        function addListError(response) {
            return response;
        }

        ////////////////////////////////////////

        function getAllLists(userId) {

            return $http({
                method:   'GET',
                url:      allListsUrl,
                dataType: 'json',
                headers:  {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                params:   {
                    userId: userId
                }

            }).then(getAllListsSuccess).catch(getAllListsError);
        }


        function getAllListsSuccess(response) {
            return response.data;
        }


        function getAllListsError(response) {
            return response;
        }

        ////////////////////////////////////////

        function getSingleList(listId) {

            return $http({
                method:   'GET',
                url:      singleListUrl,
                dataType: 'json',
                headers:  {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                params:   {
                    id: listId
                }

            }).then(getSingleListSuccess).catch(getSingleListError);
        }


        function getSingleListSuccess(response) {
            return response.data[0];
        }


        function getSingleListError(response) {
            return response;
        }

        ////////////////////////////////////////


        function updateList(list) {
            return $http({
                method: "PATCH",
                url:    singleListUrl,
                params: {
                    id: list.id
                }

            }).then(updateListSuccess).catch(updateListError)
        }

        function updateListSuccess(response) {
            return response;
        }

        function updateListError(response) {
            return response;
        }


    }

})();