define([
    'amplify'],
    function (amplify) {
        var
            serviceUrl = '/api/user',
            init = function () {

                amplify.request.define('users', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('user', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('userAdd', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('userUpdate', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('userDelete', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8'
                });
            },

            getUsers = function (callbacks) {
                return amplify.request({
                    resourceId: 'users',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getUser = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'user',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            addUser = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'userAdd',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            updateUser = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'userUpdate',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            deleteUser = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'userDelete',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();


        return {
            getUsers: getUsers,
            getUser: getUser,
            addUser: addUser,
            updateUser: updateUser,
            deleteUser: deleteUser
        };


    }
);