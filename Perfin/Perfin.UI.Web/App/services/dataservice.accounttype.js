define([
    'amplify'],
    function (amplify) {
        var
            serviceUrl = '/api/accounttype',
            init = function () {

                amplify.request.define('accounttypes', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('accounttype', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('accounttypeAdd', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('accounttypeUpdate', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('accounttypeDelete', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8'
                });
            },

            getAccountTypes = function (callbacks) {
                return amplify.request({
                    resourceId: 'accounttypes',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getAccountType = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'accounttype',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            addAccountType = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'accounttypeAdd',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            updateAccountType = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'accounttypeUpdate',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            deleteAccountType = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'accounttypeDelete',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();


        return {
            getAccountTypes: getAccountTypes,
            getAccountType: getAccountType,
            addAccountType: addAccountType,
            updateAccountType: updateAccountType,
            deleteAccountType: deleteAccountType
        };


    }
);