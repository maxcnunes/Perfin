define(['amplify', 'security/authentication', 'services/callback.dataservice'],
    function (amplify, authentication, callbackDataservice) {
        var
            serviceUrl = '/api/entry',
            init = function () {

                amplify.request.define('entries', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'GET',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                    //cache:true
                }),

                amplify.request.define('entry', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'GET',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                    //cache:true
                }),

                amplify.request.define('entryAdd', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                }),

                amplify.request.define('entryUpdate', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                }),

                amplify.request.define('entryDelete', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                }),

                amplify.request.define('totalTypeTransactionsByMonth', 'ajax', {
                    url: '/api/chart' + '/totalTypeTransactionsByMonth',
                    dataType: 'json',
                    type: 'GET',
                    beforeSend: authentication.authorizationHeader,
                    decoder: callbackDataservice.beforeExecCallback
                    //cache:true
                });
            },

            getEntries = function (callbacks) {
                return amplify.request({
                    resourceId: 'entries',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getEntry = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'entry',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            addEntry = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'entryAdd',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            updateEntry = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'entryUpdate',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            deleteEntry = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'entryDelete',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getEntriesTotalTypeTransactionsByMonth = function (callbacks) {
                return amplify.request({
                    resourceId: 'totalTypeTransactionsByMonth',
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();


        return {
            getEntries: getEntries,
            getEntry: getEntry,
            addEntry: addEntry,
            updateEntry: updateEntry,
            deleteEntry: deleteEntry,
            getEntriesTotalTypeTransactionsByMonth: getEntriesTotalTypeTransactionsByMonth
        };


    }
);