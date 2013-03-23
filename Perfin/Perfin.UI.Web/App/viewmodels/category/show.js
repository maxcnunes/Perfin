define([
    'services/datacontext',
    'services/logger',
    'durandal/system',
    'jquery'],
    function (datacontext, logger, system, $) {
        var
            show = this,
            categories = ko.observable(),

            activate = function () {

                return $.Deferred(function (def) {
                    $.when(datacontext.category.getData({ results: categories }))

                        .pipe(function () {
                            logger.log('Fetched data for: ' + categories().length + ' categories ',
                                null, system.getModuleId(show), true);
                        })

                        .fail(function () { def.reject(); })

                        .done(function () { def.resolve(); });

                }).promise();
            };

        return {
            categories: categories,
            activate: activate,

            // module page info
            pageDisplayName: 'List Category',
            pageDescription: 'All your categories'
        };
    });