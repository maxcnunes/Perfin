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
            accounttypes = ko.observableArray(),
            isDeleting = ko.observable(false),

            activate = function () {

                return $.Deferred(function (def) {
                    $.when(datacontext.accounttype.getData({ results: accounttypes }))

                        .pipe(function () {

                            logger.info('Fetched data for: ' + accounttypes().length + ' accounttypes ',
                                true, null, system.getModuleId(show));
                        })

                        .fail(function () { def.reject(); })

                        .done(function () { def.resolve(); });

                }).promise();
            },

            gotoDetails = function (selectedItem) {
                if (selectedItem && selectedItem.id()) {
                    var url = '#/accounttype/details/' + selectedItem.id();
                    router.navigateTo(url);
                }
            },

            viewAttached = function (view) {
                bindEventToList(view, '.btnEdit', gotoDetails);
                bindEventToList(view, '.btnDelete', deleteAccountType);
            },

            bindEventToList = function (rootSelector, selector, callback, eventName) {
                var eName = eventName || 'click';
                $(rootSelector).on(eName, selector, function () {
                    var accounttype = ko.dataFor(this);
                    callback(accounttype);
                    return false;
                });
            },

            deleteAccountType = function (selectedItem) {
                if (!selectedItem || !selectedItem.id()) {
                    return;
                }

                var msg = 'Delete account type "' + selectedItem.name() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);

                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.accounttype.deleteData(selectedItem))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            accounttypes.remove(selectedItem);
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
            accounttypes: accounttypes,
            activate: activate,
            viewAttached: viewAttached,

            // module page info
            pageDisplayName: 'List Account Type',
            pageDescription: 'All your account types',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.accounttype.show)
        };
    });