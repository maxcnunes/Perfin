define([
    'amplify'],
    function (amplify) {
        var
            serviceUrl = '/api/account',
            init = function () {

                amplify.request.define('accounts', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('account', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('accountAdd', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('accountUpdate', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('accountDelete', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8'
                });
            },

            getAccounts = function (callbacks) {
                return amplify.request({
                    resourceId: 'accounts',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getAccount = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'account',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            addAccount = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'accountAdd',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            updateAccount = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'accountUpdate',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            deleteAccount = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'accountDelete',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();


        return {
            getAccounts: getAccounts,
            getAccount: getAccount,
            addAccount: addAccount,
            updateAccount: updateAccount,
            deleteAccount: deleteAccount
        };


    }
);