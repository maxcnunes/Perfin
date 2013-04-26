define(['repositories/datacontext', 'common/config'],
    function (datacontext, config) {
        var
            fetchAllJsonData = function () {
                datacontext.assets.getData().
                done(function (dto) {
                    if (!dto) return;
                    config.authentication.auth0ClientId = dto.auth0ClientId;
                });
            },

            fetchAllQueryStringData = function () { },

            fetchAll = function () {
                fetchAllJsonData();
                fetchAllQueryStringData();
            };

        return {
            fetchAll: fetchAll
        };
    }
);