define([
    'durandal/plugins/router',
    'durandal/app',
    'common/config',
    'common/logger',
    'durandal/system',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.user',
    'auth0SDK', 'security/authentication'],
    function (router, app, config, logger, system, datacontext, router, model, auth0SDK, authentication) {
        var
            user = authentication.currentUser,
            loginModule = this,
            activate = function () { },
            boot = function () {
                logger.info('App Loaded! Login', true, null, system.getModuleId(loginModule));
                router.map(config.routes);
                return router.activate(config.startModule);
            },
            canLogin = ko.computed(function () {
                return auth0SDK && !user();
            }),
            login = function () {
                Auth0.signIn();
            },
            goRegister = function () {
                router.replaceLocation('#/user/register');
            };

        var vm = {
            activate: activate,
            canLogin: canLogin,
            login: login,
            goRegister: goRegister,

            // module page info
            pageDisplayName: 'Login',
            pageDescription: ''
        };

        return vm;
    });