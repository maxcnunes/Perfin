define([
    'durandal/plugins/router',
    'services/datacontext',
    'durandal/app'],
    function (router, datacontext, app) {

        var
            user = ko.observable(),
            isSaving = ko.observable(false),
            isDeleting = ko.observable(false),

            activate = function (routeData) {
                var id = parseInt(routeData.id);
                initLookups();
                return getUser(id);
            },
            initLookups = function () {

            },
            getUser = function (currentUserId, completeCallback, forceRefresh) {
                var callback = function () {
                    if (completeCallback)
                        completeCallback();

                    //validationErrors = ko.validation.group(user());
                };

                datacontext.user.getUserById(
					currentUserId, {
					    success: function (modelResult) {
					        user(modelResult);
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
            canEditUser = ko.computed(function () {
                return user();
            }),
            hasChanges = ko.computed(function () {
                if (canEditUser()) {
                    return user().dirtyFlag().isDirty();
                }
                return false;
            }),
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving();
            }),

            save = function () {

                isSaving(true);
                if (canEditUser()) {
                    $.when(datacontext.user.updateData(user()))
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
                //if (this._userAdded == false) {
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
            deleteUser = function () {
                var msg = 'Delete user "' + user().login() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);
            
                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.user.deleteData(user()))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            router.navigateTo('#/user/show');
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
            user: user,
            activate: activate,

            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            deleteUser: deleteUser,

            // module page info
            pageDisplayName: 'Edit User',
            pageDescription: 'Edit a user for more personal info'
        };

        return vm;
    });
