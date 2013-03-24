﻿define([
    'durandal/plugins/router',
    'durandal/app',
    'common/config',
    'common/logger',
    'durandal/system'],
    function (router, app, config, logger, system) {
        var
            shell = this,
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
            boot = function () {
                logger.info('App Loaded!', true, null, system.getModuleId(shell));
                router.map(config.routes);
                return router.activate(config.startModule);
            },
            failedInitialization = function (error) {
                var msg = 'App initialization failed: ' + error.message;
                logger.error(msg, true, error, system.getModuleId(shell));
            };

        return {
            router: router,
            search: search,
            activate: activate
        };
    });