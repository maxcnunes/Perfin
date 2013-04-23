﻿define([
    'durandal/plugins/router',
    'durandal/app',
    'common/config',
    'common/logger',
    'durandal/system'],
    function (router, app, config, logger, system, authentication) {
        debugger;
        var
            publicModule = this,
            router = router,
            search = function () {
                //It's really easy to show a message box.
                //You can add custom options too. Also, it returns a promise for the user's response.
                app.showMessage('Search not yet implemented...');
            },
            activate = function () {
                //fetchCurrentUser();
                return boot();
                //return dataprimer.fetch()
                //    .then(boot);
                //    .fail(failedInitialization);
            },
            fetchCurrentUser = function () {
                authentication.fetchQueryStringData();
                authentication.fetchCurrentUser();
            },
            boot = function () {
                logger.info('App Loaded! Public Modules', true, null, system.getModuleId(publicModule));
                router.map(config.publicRoutes);
                router.replaceLocation('#/user/login');
                return router.activate('user/login');
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