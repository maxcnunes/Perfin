define('store',
    ['jquery', 'amplify', 'config'],
    function ($, amplify, config) {

        // Private Members
        var
            expires = { expires: config.storeExpirationMs },

            clear = function (key) {
                return amplify.store(key, null);
            },

            fetch = function (key) {
                return amplify.store(key);
            },

            save = function (key, value) {
                amplify.store(key, value, expires);
            };


        // Public Members
        return {
            clear: clear,
            fetch: fetch,
            save: save
        };
    }
);