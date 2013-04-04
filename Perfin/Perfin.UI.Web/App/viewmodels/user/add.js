define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.user'],
    function (app, datacontext, router, model) {


        var
            isSaving = ko.observable(false),
            user = ko.observable(),

            activate = function () {
                initLookups(); //start 
                user(new model());
            },
            initLookups = function () {
                //
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditUser = ko.computed(function () {
                return user();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                if (canEditUser()) {
                    return user().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
            }),
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving();
            }),
            save = function () {

                isSaving(true);
                if (canEditUser()) {
                    $.when(datacontext.user.addData(user()))
                        .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                function goToEditView(result) {
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/user/show');

                    //router.replaceLocation('#/category/details/' + category().id());
                }

                function complete() {
                    isSaving(false);
                }
            },
            canDeactivate = function () {
                return true;

                // OLD
                //----------------------------
                //if (this._categoryAdded == false) {
                //    return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
                //} else {
                //    return true;
                //}


                // NEW EXAMPLE
                //----------------------------
                if (hasChanges()) {
                    var msg = 'Do you want to leave and cancel?';
                    return app.showMessage(msg, 'Navigate Away', ['Yes', 'No'])
                        .then(function (selectedOption) {
                            if (selectedOption === 'Yes') {
                                //datacontext.cancelChanges();  ToDo: verify return 
                            }
                            return selectedOption;
                        });
                }
                return true;
            };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            user: user,

            // module page info
            pageDisplayName: 'Create New User',
            pageDescription: 'Create a new user'
        };

        return vm;
    });