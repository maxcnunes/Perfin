define([
    'durandal/plugins/router',
    'durandal/app',
    'common/config',
    'common/logger',
    'durandal/system'],
    function (router, app, config, logger, system) {
        var
            publicModule = this,
            router = router,
            activate = function () {
                return boot();
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
            activate: activate
        };
    });