define([
    'durandal/plugins/router',
    'services/datacontext',
    'durandal/app',
    'common/breadcrumb',
    'common/config'],
    function (router, datacontext, app, breadcrumb, config) {

        var
            account = ko.observable(),
            accounttypes = ko.observable(),
            categories = ko.observable(),
            isSaving = ko.observable(false),
            isDeleting = ko.observable(false),

            activate = function (routeData) {
                var id = parseInt(routeData.id);
                initLookups();
                return getAccount(id);
            },
            initLookups = function () {
                $.when(getAllCategories(), getAllAccountTypes());

                function getAllCategories() {
                    return $.Deferred(function (def) {
                        $.when(datacontext.category.getData({ results: categories }))
                            .fail(function () { def.reject(); })
                            .done(function () { def.resolve(); });
                    }).promise();
                }

                function getAllAccountTypes() {
                    return $.Deferred(function (def) {
                        $.when(datacontext.accounttype.getData({ results: accounttypes }))
                            .fail(function () { def.reject(); })
                            .done(function () { def.resolve(); });
                    }).promise();
                }
            },
            getAccount = function (currentAccountId, completeCallback, forceRefresh) {
                var callback = function () {
                    if (completeCallback) { completeCallback(); }
                    validationErrors = ko.validation.group(account());
                };

                datacontext.account.getAccountById(
					currentAccountId, {
					    success: function (modelResult) {
					        account(modelResult);
					        callback();
					    },
					    error: callback
					},
					forceRefresh
				);
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditAccount = ko.computed(function () {
                return account();
            }),
            hasChanges = ko.computed(function () {
                if (canEditAccount()) {
                    return account().dirtyFlag().isDirty();
                }
                return false;
            }),
            isValid = function () {
                return canEditAccount() ? validationErrors().length === 0 : true;
            },
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving() && isValid();
            }),

            save = function () {

                isSaving(true);
                if (canEditAccount()) {
                    $.when(datacontext.account.updateData(account()))
                        .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                function goToEditView(result) {
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/account/show');
                }

                function complete() {
                    isSaving(false);
                }
            },

            canDeactivate = function () {
                return true;

                // OLD
                //----------------------------
                //if (this._accounttypeAdded == false) {
                //    return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
                //} else {
                //    return true;
                //}


                // NEW EXAMPLE
                //----------------------------
                //if (hasChanges()) {
                //    var msg = 'Do you want to leave and cancel?';
                //    return app.showMessage(msg, 'Navigate Away', ['Yes', 'No'])
                //        .then(function (selectedOption) {
                //            if (selectedOption === 'Yes') {
                //                datacontext.cancelChanges();
                //            }
                //            return selectedOption;
                //        });
                //}
                //return true;
            },
            goBack = function () {
                router.navigateBack();
            },
            deleteItem = function () {
                var msg = 'Delete account "' + account().name() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);
            
                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.account.deleteData(account()))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            router.navigateTo('#/account/show');
                        }

                        function failed(error) {
                            cancel();
                            var errorMsg = 'Error: ' + error.message;
                            logger.logError(
                                true, errorMsg, error, system.getModuleId(vm));
                        }

                        function finish() {
                            return selectedOption;
                        }
                    }
                    isDeleting(false);
                }
            };

        var vm = {
            account: account,
            accounttypes: accounttypes,
            categories: categories,
            activate: activate,

            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            deleteItem: deleteItem,

            // module page info
            pageDisplayName: 'Edit Account',
            pageDescription: 'Edit a account and let more organized your finances',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.account.details)
        };

        return vm;
    });
