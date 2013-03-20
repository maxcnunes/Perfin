define([
    'durandal/plugins/router',
    'durandal/app',
    'config'],
    function (router, app, config) {

    var
        router = router,
        search = function () {
            //It's really easy to show a message box.
            //You can add custom options too. Also, it returns a promise for the user's response.
            app.showMessage('Search not yet implemented...');
        },
        activate = function () {
            //return datacontext.primeData()
            //    .then(boot)
            //    .fail(failedInitialization);

            return boot();
        },
        boot = function() {
            //logger.log('App Loaded!', null, system.getModuleId(shell), true);
            router.map(config.routes);
            return router.activate(config.startModule);
        },
        failedInitialization = function (error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.logError(msg, error, system.getModuleId(shell), true);
        };

    return {
        router: router,
        search: search,
        activate: activate
    };
});