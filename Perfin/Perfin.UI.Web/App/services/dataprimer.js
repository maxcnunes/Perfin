// Fetch Data

define('dataprimer',
    ['ko', 'datacontext', 'config'],
    function (ko, datacontext, config) {

        // Private Members
        var
            logger = config.logger,

            fetch = function () {

                return $.Deferred(function (def) {

                    var data = {
                        categories: ko.observable()
                    };

                    $.when(
                        datacontext.categories.getData({ results: data.categories })

                        // FETCH THE CURRENT USER
                        //datacontext.persons.getFullPersonById(config.currentUserId,
                        //    {
                        //        success: function(person) {
                        //            config.currentUser(person);
                        //        }
                        //    }, true)
                    )

                    //pipe: JQuery utility method to filter and/or chain Deferreds.

                    .pipe(function () {
                        // Refresh local cache here
                    })

                    .pipe(function () {
                        logger.success('Fetched data for: '
                            + '<div>' + data.categories().length + ' categories </div>'
                            //+ '<div>' + (config.currentUser().isNullo ? 0 : 1) + ' user profile </div>'
                        );
                    })

                    .fail(function () { def.reject(); })

                    .done(function () { def.resolve(); });

                }).promise();
            };

        // Public Members
        return {
            fetch: fetch
        };
    }
);