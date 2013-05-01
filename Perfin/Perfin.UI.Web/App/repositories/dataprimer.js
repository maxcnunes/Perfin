define(['ko', 'repositories/datacontext', 'common/logger'],
    function (ko, datacontext, logger) {

        var
            fetch = function () {

                return $.Deferred(function (def) {

                    var data = {
                        category: ko.observable(),
                        user: ko.observable(),
                        entry: ko.observable()
                    };

                    $.when(
                        datacontext.category.getData({ results: data.category }),
                        datacontext.user.getData({ results: data.user }),
                        datacontext.entry.getData({ results: data.entry })
                    )

                    .pipe(function () {
                        // -- EXAMPLE
                        //// Need sessions and speakers in cache before
                        //// speakerSessions models can be made (client model only)
                        //datacontext.speakerSessions.refreshLocal();
                    })

                    .pipe(function () {
                        var msg = 'Fetched data for: '
                            + '<div>' + data.category().length + ' categories </div>'
                            + '<div>' + data.user().length + ' users </div>'
                            + '<div>' + data.entry().length + ' entries </div>';

                        logger.info(msg, true, null, null);
                    })

                    .fail(function () { def.reject(); })

                    .done(function () { def.resolve(); });

                }).promise();
            };

        return {
            fetch: fetch
        };
    });