﻿requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

// Load the 3rd party libraries
(function () {
    // Establish the root object, 'window' in the browser, or 'global' on the server.
    var root = this;

    // These are already loaded via bundles. 
    // We define them and put them in the root object.
    define('jquery', [], function () { return root.jQuery; });
    define('ko', [], function () { return root.ko; });
    define('amplify', [], function () { return root.amplify; });
    //define('infuser', [], function () { return root.infuser; });
    define('moment', [], function () { return root.moment; });
    define('sammy', [], function () { return root.Sammy; });
    define('toastr', [], function () { return root.toastr; });
    define('underscore', [], function () { return root._; });
    define('auth0SDK', [], function () { return root.Auth0; });
})();

define([
    'durandal/app',
    'durandal/viewLocator',
    'durandal/system',
    'durandal/plugins/router',
    'common/logger'],
    function (app, viewLocator, system, router, logger) {
        var
            rootApp = {
                public: 'viewmodels/public',
                private: 'viewmodels/shell'
            },

            fetchAssets = function () {
                require(['common/assets'], function (assets) {
                    assets.fetchAll();
                });
            },

            fetchCurrentUser = function () {
                require(['security/authentication', 'repositories/datacontext', 'jquery'],
                    function (authentication, datacontext, $) {
                        authentication.datacontext(datacontext);
                        authentication.fetchQueryStringData();

                        $.when(authentication.fetchCurrentUser())
                         .done(bootAppPrivate)
                         .fail(bootAppPublic);

                        function bootAppPrivate() { bootApp(true); }
                        function bootAppPublic() { bootApp(false); }
                    });
            },

            bootApp = function (privateModels) {
                //>>excludeStart("build", true);
                system.debug(true);
                //>>excludeEnd("build");

                app.title = 'Perfin';
                app.start().then(function () {
                    // route will use conventions for modules
                    // assuming viewmodels/views folder structure
                    router.useConvention();

                    // When finding a module, replace the viewmodel string 
                    // with view to find it partner view.
                    // [viewmodel]s/sessions --> [view]s/sessions.html
                    // Otherwise you can pass paths for modules, views, partials
                    // Defaults to viewmodels/views/views. 
                    viewLocator.useConvention();

                    var _rootApp = privateModels ? rootApp.private : rootApp.public;
                    app.setRoot(_rootApp, 'entrance');

                    // override bad route behavior to write to 
                    // console log and show error toast
                    router.handleInvalidRoute = function (route, params) {
                        logger.error('No route found', true, route, 'main');
                    };
                });
            },

            init = function () {
                // Load the 3rd party libraries
                //define3rdPartyModules();

                /* Not using now. But is already implemented.*/
                //// Load configurations values
                //fetchAssets(); 

                fetchCurrentUser();

                // Boot App
                //bootApp();
            };

        init();
    });