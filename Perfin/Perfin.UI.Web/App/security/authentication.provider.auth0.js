define([
    'common/config',
    'models/model.mapper',
    'jquery'],
    function (config, modelmapper, $) {

        var
            clientId = config.authentication.auth0ClientId,
            tokenId = '',
            accessToken = '',
            urlUserInfo = 'https://api.auth0.com/userinfo?access_token=',
            getSrcScript = function () {
                return 'https://sdk.auth0.com/auth0.js#client=' + clientId + '&scope=openid&response_type=token';
            },
            getTokenId = function () {
                var localAuth0TokenId = localStorage.getItem(config.authentication.localTokenId);
                if (localAuth0TokenId && localAuth0TokenId !== 'null') {
                    tokenId = localAuth0TokenId;
                }

                if (!tokenId) {
                    var qsTokenId = /id_token=([^&]*)/g.exec(window.location.hash);
                    if (qsTokenId) {
                        tokenId = qsTokenId[1];
                        localStorage.setItem(config.authentication.localTokenId, tokenId);
                    }
                }
                return tokenId;
            },
            getAccessToken = function () {
                var localAuth0AccessToken = localStorage.getItem(config.authentication.localAccessToken);
                if (localAuth0AccessToken && localAuth0AccessToken !== 'null') {
                    accessToken = localAuth0AccessToken;
                }

                if (!accessToken) {
                    var qsAccessToken = /access_token=([^&]*)/g.exec(window.location.hash);
                    if (qsAccessToken) {
                        accessToken = qsAccessToken[1];
                        localStorage.setItem(config.authentication.localAccessToken, accessToken);
                    }
                }
                return accessToken;
            },
            authorizationHeader = function (request) {
                if (getTokenId()) request.setRequestHeader("Authorization", "Bearer " + getTokenId());
            },
            getUserInfoAuth0 = function () {
                /*
                 * Can't depend of datacontext module. This will cause a cycle reference
                 */
                return $.Deferred(function (def) {
                    $.ajax({
                        url: urlUserInfo + getAccessToken(),
                        dataType: 'json',
                        success: function (dto) {
                            var user = modelmapper.user.fromAuth0Dto(dto); // Map DTO to Model
                            def.resolve(dto);
                        },
                        error: function (resp) {
                            if (resp.status == 401) {
                                //Unauthorized
                            }
                            def.reject(resp);
                        }
                    });
                }).promise();
            },
            fetchQueryStringData = function () {
                getTokenId();
                getAccessToken();
            },
            onAuthFail = function () {

            },
            cleanAuth = function () {
                localStorage.removeItem(config.authentication.localTokenId);
                localStorage.removeItem(config.authentication.localAccessToken);
                tokenId = '';
                accessToken = '';
            };

        return {
            tokenId : tokenId,
            accessToken : accessToken,
            urlUserInfo: urlUserInfo,
            getSrcScript: getSrcScript,
            getTokenId: getTokenId,
            getAccessToken: getAccessToken,
            authorizationHeader: authorizationHeader,
            getUserInfoAuth0: getUserInfoAuth0,
            fetchQueryStringData: fetchQueryStringData,
            cleanAuth: cleanAuth
        };
    });