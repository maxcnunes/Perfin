requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define([
    'durandal/app',
    'durandal/viewLocator',
    'durandal/system',
    'durandal/plugins/router'],
    function(app, viewLocator, system, router) {

        //>>excludeStart("build", true);
        system.debug(true);
        //>>excludeEnd("build");

        app.title = 'Durandal Starter Kit';
        app.start().then(function() {
            // route will use conventions for modules
            // assuming viewmodels/views folder structure
            router.useConvention();

            // When finding a module, replace the viewmodel string 
            // with view to find it partner view.
            // [viewmodel]s/sessions --> [view]s/sessions.html
            // Otherwise you can pass paths for modules, views, partials
            // Defaults to viewmodels/views/views. 
            viewLocator.useConvention();

            app.setRoot('viewmodels/shell', 'entrance');

            // override bad route behavior to write to 
            // console log and show error toast
            router.handleInvalidRoute = function (route, params) {
                logger.logError('No route found', route, 'main', true);
            };
        });
    });