define([
    'repositories/datacontext',
    'common/logger',
    'durandal/system',
    'durandal/plugins/router',
    'jquery',
    'durandal/app',
    'common/breadcrumb',
    'common/config'],
    function (datacontext, logger, system, router, $, app, breadcrumb, config) {
        var
            show = this,
            entries = ko.observableArray(),
            isDeleting = ko.observable(false),

            activate = function () {
                debugger;
                return $.Deferred(function (def) {
                    $.when(datacontext.entry.getData({ results: entries }))

                        .pipe(function () {

                            logger.info('Fetched data for: ' + entries().length + ' entries ',
                                true, null, system.getModuleId(show));
                        })

                        .fail(function () { def.reject(); })

                        .done(function () { def.resolve(); });

                }).promise();
            },

            gotoDetails = function (selectedItem) {
                if (selectedItem && selectedItem.id()) {
                    var url = '#/entry/details/' + selectedItem.id();
                    router.navigateTo(url);
                }
            },

            viewAttached = function (view) {
                bindEventToList(view, '.btnEdit', gotoDetails);
                bindEventToList(view, '.btnDelete', deleteEntryType);
            },

            bindEventToList = function (rootSelector, selector, callback, eventName) {
                var eName = eventName || 'click';
                $(rootSelector).on(eName, selector, function () {
                    var entry = ko.dataFor(this);
                    callback(entry);
                    return false;
                });
            },

            deleteEntryType = function (selectedItem) {
                if (!selectedItem || !selectedItem.id()) {
                    return;
                }

                var msg = 'Delete entry "' + selectedItem.account.name() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);

                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.entry.deleteData(selectedItem))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            entries.remove(selectedItem);
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
            entries: entries,
            activate: activate,
            viewAttached: viewAttached,

            // module page info
            pageDisplayName: 'List Entry',
            pageDescription: 'All your entries',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.entry.show)
        };
    });