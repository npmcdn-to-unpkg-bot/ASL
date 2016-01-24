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
            removeList:    removeList,
            updateList:    updateList

        };


        ////////////////////////////////////////


        function addList(newList, userId) {


            return $http({
                method: "POST",
                url:    allListsUrl,
                dataType: 'json',
                headers:  {
                    'Content-Type': 'application/json',
                    'Accept':       'application/json'
                },
                params: {
                    listName: newList,
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
            console.log(userId);

            return $http({
                method:   'GET',
                url:      allListsUrl,
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

        function removeList(listId) {

            return $http({
                method: "Delete",
                url:    allListsUrl,
                params: {
                    listId: listId
                }

            }).then(removeListSuccess).catch(removeListError)
        }

        function removeListSuccess(response) {
            return response;
        }

        function removeListError(response) {
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