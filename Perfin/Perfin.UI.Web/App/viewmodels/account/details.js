define([
    'durandal/plugins/router',
    'services/datacontext',
    'durandal/app'],
    function (router, datacontext, app) {

        var
            account = ko.observable(),
            name = ko.observable(),
            isSaving = ko.observable(false),
            isDeleting = ko.observable(false),

            activate = function (routeData) {
                var id = parseInt(routeData.id);
                initLookups();
                return getAccountType(id);
            },
            initLookups = function () {

            },
            getAccountType = function (currentAccountTypeId, completeCallback, forceRefresh) {
                var callback = function () {
                    if (completeCallback) { completeCallback(); }
                    validationErrors = ko.validation.group(account());
                };

                datacontext.account.getAccountTypeById(
					currentAccountTypeId, {
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
                        .done(complete);//.fin(complete);
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
            deleteAccountType = function () {
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
            name: name,
            activate: activate,

            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            deleteAccountType: deleteAccountType,

            // module page info
            pageDisplayName: 'Edit AccountType',
            pageDescription: 'Edit a account and let more organized your finances'
        };

        return vm;
    });
