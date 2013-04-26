define(['amplify', 'security/authentication', 'services/callback.dataservice'],
    function (amplify, authentication, callbackDataservice) {
        var
            serviceUrl = '/api/user',
            init = function () {
                amplify.request.define('users', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'GET',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                    //cache:true
                }),

                amplify.request.define('user', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'GET',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                    //cache:true
                }),

                amplify.request.define('userAdd', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                }),

                amplify.request.define('userUpdate', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                }),

                amplify.request.define('userDelete', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                }),

                amplify.request.define('userInfoAuth0', 'ajax', {
                    url: authentication.urlUserInfo + '{accessToken}',
                    dataType: 'json',
                    type: 'GET',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                    //cache:true
                }),
                
                amplify.request.define('userImport', 'ajax', {
                    url: serviceUrl + '/import',
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
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
            },

            getUserInfoAuth0 = function (callbacks, accessToken) {
                return amplify.request({
                    resourceId: 'userInfoAuth0',
                    data: { accessToken: accessToken },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },
            
            importUser = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'userImport',
                    data: data,
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
            deleteUser: deleteUser,
            importUser: importUser,
            // Auth0
            getUserInfoAuth0: getUserInfoAuth0
        };


    }
);