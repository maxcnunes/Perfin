define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.accounttype'],
    function (app, datacontext, router, model) {


        var
            isSaving = ko.observable(false),
            name = ko.observable(false),
            accounttype = ko.observable(),
            validationErrors = ko.observableArray([]),

            activate = function () {
                initLookups();
                accounttype(new model());
                //accounttype(datacontext.createSession());
            },
            initLookups = function () {
                //parentCategories(datacontext.lookups.rooms);
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditAccountType = ko.computed(function () {
                return accounttype();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                if (canEditAccountType()) {
                    return accounttype().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
            }),
            isValid = function () {
                return canEditAccountType() ? validationErrors().length === 0 : true;
            },
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving() && isValid();
            }),
            save = function () {

                isSaving(true);
                if (canEditAccountType()) {
                    $.when(datacontext.accounttype.addData(accounttype()))
                        .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                function goToEditView(result) {
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/accounttype/show');

                    //router.replaceLocation('#/accounttype/details/' + accounttype().id());
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
             };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            accounttype: accounttype,
            goBack: goBack,

            // module page info
            pageDisplayName: 'Create AccountType',
            pageDescription: 'Create a accounttype and let more organized your finances'
        };

        return vm;
    });