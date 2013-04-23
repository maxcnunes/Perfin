define([
    'ko',
    'jquery',
    'durandal/plugins/router',
    'common/config',
    'security/authentication.provider.auth0',
    'durandal/plugins/router'],
    function (ko, $, router, config, auth0, router) {
        var
            currentUser = ko.observable(),
            fetchCurrentUser = function () {
                return $.Deferred(function (def) {
                    $.when(authProvider.getUserInfo())
                     .done(fetched)
                     .fail(unauthorized);

                    function fetched(modelResult) {
                        currentUser(modelResult);
                        def.resolve(modelResult);
                    };
                    function unauthorized(resp) {
                        onAuthFail(resp);
                        def.reject(resp);
                    };
                }).promise();
            },
            onAuthFail = function (resp) {
                //Unauthorized
                if (resp.status === 401) {
                    authProvider.cleanAuth();
                    currentUser = ko.observable();

                    // reset the routes
                    router.map(config.publicRoutes);

                    if (window.location.href.indexOf('#/user/login') < 0) {
                        router.replaceLocation('#/user/login');
                    }
                    return true;
                }
                // Another error type
                return false;
            };

        /* Extended provider: 
         * Using a extended provider we keep the Open Closed Principle
         */
        var authProvider = {
            urlUserInfo: auth0.urlUserInfo,
            getSrcScript: auth0.getSrcScript,
            getTokenId: auth0.getTokenId,
            getAccessToken: auth0.getAccessToken,
            authorizationHeader: auth0.authorizationHeader,
            getUserInfo: function () {
                return $.Deferred(function (def) {
                    if (rejectUserWithEmptyTokenId()) return;

                    $.when(auth0.getUserInfoAuth0())
                     .done(function (dto) {
                         def.resolve(dto);
                     })
                     .fail(function (resp) {
                         onAuthFail(resp);
                         def.reject(resp);
                     });

                    function rejectUserWithEmptyTokenId() {
                        if (!auth0.getTokenId()) {
                            var respUnauthorized = { status: 401 };
                            onAuthFail(respUnauthorized);
                            def.reject(respUnauthorized);
                            return true;
                        }
                        return false;
                    }
                }).promise();
            },
            fetchQueryStringData: auth0.fetchQueryStringData,
            cleanAuth: auth0.cleanAuth
        };

        return {
            currentUser: currentUser,
            fetchCurrentUser: fetchCurrentUser,
            urlUserInfo: authProvider.urlUserInfo,
            getSrcScript: authProvider.getSrcScript,
            getTokenId: authProvider.getTokenId,
            getAccessToken: authProvider.getAccessToken,
            authorizationHeader: authProvider.authorizationHeader,
            getUserInfo: authProvider.getUserInfo,
            fetchQueryStringData: authProvider.fetchQueryStringData,
            onAuthFail: onAuthFail
        };
    });