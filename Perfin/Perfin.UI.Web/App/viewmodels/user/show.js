define([
    'services/datacontext',
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
            users = ko.observableArray(),
            isDeleting = ko.observable(false),

            activate = function () {

                return $.Deferred(function (def) {
                    $.when(datacontext.user.getData({ results: users }))

                        .pipe(function () {

                            logger.info('Fetched data for: ' + users().length + ' users ',
                                true, null, system.getModuleId(show));
                        })

                        .fail(function () { def.reject(); })

                        .done(function () { def.resolve(); });

                }).promise();
            },

            gotoDetails = function (selectedItem) {
                if (selectedItem && selectedItem.id()) {
                    var url = '#/user/details/' + selectedItem.id();
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
                    var user = ko.dataFor(this);
                    callback(user);
                    return false;
                });
            },

            deleteCategory = function (selectedItem) {
                if (!selectedItem || !selectedItem.id()) {
                    return;
                }

                var msg = 'Delete user "' + selectedItem.name() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);

                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.user.deleteData(selectedItem))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            users.remove(selectedItem);
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
            users: users,
            activate: activate,
            viewAttached: viewAttached,

            // module page info
            pageDisplayName: 'List User',
            pageDescription: 'All your users',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.user.show)
        };
    });