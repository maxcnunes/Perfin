requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define([
    'durandal/app',
    'durandal/viewLocator',
    'durandal/system',
    'durandal/plugins/router',
    'common/logger'],
    function (app, viewLocator, system, router, logger) {
        var
            // Establish the root object, 'window' in the browser, or 'global' on the server.
            root = this,

            define3rdPartyModules = function () {
                // These are already loaded via bundles. 
                // We define them and put them in the root object.
                define('jquery', [], function () { return root.jQuery; });
                define('ko', [], function () { return root.ko; });
                define('amplify', [], function () { return root.amplify; });
                //define('infuser', [], function () { return root.infuser; });
                //define('moment', [], function () { return root.moment; });
                define('sammy', [], function () { return root.Sammy; });
                define('toastr', [], function () { return root.toastr; });
                define('underscore', [], function () { return root._; });
            },

            fetchAssets = function () {
                require(['common/assets'], function (assets) {
                    assets.fetchAll();
                });
            },

            bootApp = function () {
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

                    // LOGGED
                    // app.setRoot('viewmodels/shell', 'entrance');
                    // NOT LOGGED
                    app.setRoot('viewmodels/public', 'entrance');

                    // override bad route behavior to write to 
                    // console log and show error toast
                    router.handleInvalidRoute = function (route, params) {
                        logger.error('No route found', true, route, 'main');
                    };
                });
            },

            init = function () {
                // Load the 3rd party libraries
                define3rdPartyModules();
                
                // Load configurations
                fetchAssets();

                // Boot App
                bootApp();
            };


        init();
    });