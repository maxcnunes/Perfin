define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.entry',
    'models/model.account',
    'models/model.user'],
    function (app, datacontext, router, model, accountModel, userModel) {

        var
            isSaving = ko.observable(false),
            entry = ko.observable(),
            accounts = ko.observable(),

            activate = function () {
                //debugger;
                initLookups();
                entry(new model());
                validationErrors = ko.validation.group(entry());//apply validation
            },
            initLookups = function () {
                debugger;
                $.when(getAllAccounts());

                function getAllAccounts() {
                    return $.Deferred(function (def) {
                        $.when(datacontext.account.getData({ results: accounts }))
                            .fail(function () { def.reject(); })
                            .done(function () { def.resolve(); });
                    }).promise();
                }
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditEntry = ko.computed(function () {
                return entry();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                debugger;
                if (canEditEntry()) {
                    return entry().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
            }),
           isValid = function () {
               return canEditEntry() ? validationErrors().length === 0 : true;
           },
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving() && isValid();
            }),
            save = function () {

                isSaving(true);
                if (canEditEntry()) {
                    $.when(datacontext.entry.addData(entry()))
                      //  .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                //function goToEditView(result) {
                //    // redirect to index page while the edit page is not finished
                //    router.replaceLocation('#/entry/show');

                //    //router.replaceLocation('#/accounttype/details/' + accounttype().id());
                //}

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
             };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            entry: entry,
            accounts : accounts,

            // module page info
            pageDisplayName: 'Create an Entry',
            pageDescription: 'Create an entry and let more organized your finances'
        };

        return vm;
    });