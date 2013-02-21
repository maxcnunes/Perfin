﻿define('dataservice.category',
    ['amplify'],
    function (amplify) {
        var
            init = function () {

                amplify.request.define('categories', 'ajax', {
                    url: '/api/categories',
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('category', 'ajax', {
                    url: '/api/category/{id}',
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                }),

                amplify.request.define('categoryUpdate', 'ajax', {
                    url: '/api/',
                    dataType: 'json',
                    type: 'PUT',
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

            updateCategory = function (callbacks, data) {
                return amplify.request({
                    resourceId: 'categoryUpdate',
                    data: data,
                    success: callbacks.success,
                    error:callbacks.error
                });
            };

        init();


        return {
            getCatetories: getCatetories,
            getCategory: getCategory,
            updateCategory: updateCategory
        };


    }



});