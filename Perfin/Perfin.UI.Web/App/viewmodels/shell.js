define([
    'durandal/plugins/router',
    'durandal/app',
    'common/config',
    'common/logger',
    'durandal/system',
    'services/dataprimer',
    'security/authentication'],
    function (router, app, config, logger, system, dataprimer, authentication) {
        var
            shell = this,
            currentUser = authentication.currentUser,
            router = router,
            search = function () {
                //It's really easy to show a message box.
                //You can add custom options too. Also, it returns a promise for the user's response.
                app.showMessage('Search not yet implemented...');
            },
            activate = function () {
                return dataprimer.fetch()
                    .then(boot);
                //    .fail(failedInitialization);
            },
            boot = function () {
                logger.info('App Loaded!', true, null, system.getModuleId(shell));
                router.map(config.routes);
                router.replaceLocation('#/welcome');
                return router.activate(config.startModule);
            },
            failedInitialization = function (error) {
                var msg = 'App initialization failed: ' + error.message;
                logger.error(msg, true, error, system.getModuleId(shell));
            },
            logOut = function () {
                var msg = 'Logout ' + currentUser().name() + ' ?';
                var title = 'Confirm Logout';

                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmLogout);

                function confirmLogout(selectedOption) {
                    if (selectedOption === 'Yes') {
                        authentication.logOutCurrentUser();
                    }
                }
            };

        return {
            currentUser: currentUser,
            router: router,
            search: search,
            activate: activate,
            logOut: logOut
        };
    });