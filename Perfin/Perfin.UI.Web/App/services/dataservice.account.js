define([
    'amplify'],
    function (amplify) {
        var
            serviceUrl = '/api/category',
            init = function () {

                amplify.request.define('categories', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('category', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('categoryAdd', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'POST',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('categoryUpdate', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8'
                }),

                amplify.request.define('categoryDelete', 'ajax', {
                    url: serviceUrl + '/{id}',
                    dataType: 'json',
                    type: 'DELETE',
                    contentType: 'application/json; charset=utf-8'
                });
            },

            getCatetories = function (callbacks) {
                return amplify.request({
                    resourceId: 'categories',
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            getCategory = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'category',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            addCategory = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'categoryAdd',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            updateCategory = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'categoryUpdate',
                    data: data,
                    success: callbacks.success,
                    error: callbacks.error
                });
            },

            deleteCategory = function (callbacks, id) {
                return amplify.request({
                    resourceId: 'categoryDelete',
                    data: { id: id },
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();


        return {
            getCatetories: getCatetories,
            getCategory: getCategory,
            addCategory: addCategory,
            updateCategory: updateCategory,
            deleteCategory: deleteCategory
        };


    }
);