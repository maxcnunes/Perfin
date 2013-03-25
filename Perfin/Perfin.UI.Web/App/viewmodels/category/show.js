define([
    'services/datacontext',
    'common/logger',
    'durandal/system',
    'durandal/plugins/router',
    'jquery',
    'durandal/app'],
    function (datacontext, logger, system, router, $, app) {
        var
            show = this,
            categories = ko.observableArray(),
            isDeleting = ko.observable(false),

            activate = function () {

                return $.Deferred(function (def) {
                    $.when(datacontext.category.getData({ results: categories }))

                        .pipe(function () {

                            logger.info('Fetched data for: ' + categories().length + ' categories ',
                                true, null, system.getModuleId(show));
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
                bindEventToList(view, '.btnDelete', deleteCategory);
            },

            bindEventToList = function (rootSelector, selector, callback, eventName) {
                var eName = eventName || 'click';
                $(rootSelector).on(eName, selector, function () {
                    var category = ko.dataFor(this);
                    callback(category);
                    return false;
                });
            },

            deleteCategory = function (selectedItem) {
                if (!selectedItem || !selectedItem.id()) {
                    return;
                }

                var msg = 'Delete category "' + selectedItem.name() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);

                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.category.deleteData(selectedItem))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            categories.remove(selectedItem);
                        }

                        function failed(error) {
                            cancel();
                            var errorMsg = 'Error: ' + error.message;
                            logger.logError(
                                errorMsg, true, error, system.getModuleId(vm));
                        }

                        function finish() {
                            return selectedOption;
                        }
                    }
                    isDeleting(false);
                }
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