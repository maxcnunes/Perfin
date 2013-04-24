define([
    'amplify'],
    function (amplify) {
        var
            serviceUrl = '/api/assets',
            init = function () {

                amplify.request.define('assets', 'ajax', {
                    url: serviceUrl,
                    dataType: 'json',
                    type: 'GET'
                    //cache:true
                });
            },

            getAssets = function (callbacks) {
                return amplify.request({
                    resourceId: 'assets',
                    success: callbacks.success,
                    error: callbacks.error
                });
            };

        init();

        return {
            getAssets: getAssets
        };
    }
);