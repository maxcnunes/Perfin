define([
    'services/datacontext',
    'services/logger',
    'durandal/system',
    'durandal/plugins/router',
    'jquery'],
    function (datacontext, logger, system, router, $) {
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
            },

            gotoDetails = function (selectedItem) {
                if (selectedItem && selectedItem.id()) {
                    var url = '#/category/details/' + selectedItem.id();
                    router.navigateTo(url);
                }
            },

            viewAttached = function (view) {
                bindEventToList(view, '.btnEdit', gotoDetails);
            },

            bindEventToList = function (rootSelector, selector, callback, eventName) {
                var eName = eventName || 'click';
                $(rootSelector).on(eName, selector, function () {
                    var category = ko.dataFor(this);
                    callback(category);
                    return false;
                });
            };


        return {
            categories: categories,
            activate: activate,
            viewAttached: viewAttached,

            // module page info
            pageDisplayName: 'List Category',
            pageDescription: 'All your categories'
        };
    });