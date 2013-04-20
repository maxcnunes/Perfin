define(['services/datacontext', 'common/config'],
    function (datacontext, config) {
        var
            fetchAll = function () {
                datacontext.assets.getData().
                done(function (dto) {
                    if (!dto) return;
                    config.auth0.clientId = dto.auth0ClientId;
                });
            };

        return {
            fetchAll: fetchAll
        };
    }
);