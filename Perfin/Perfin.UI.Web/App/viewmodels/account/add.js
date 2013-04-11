define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.account',
    'models/model.accounttype',
    'models/model.category'],
    function (app, datacontext, router, model, accounttypeModel, categoryModel) {

        var
            isSaving = ko.observable(false),
            name = ko.observable(false),
            description = ko.observable(false),
            accounttypeId = ko.observable(false),
            categoryId = ko.observable(false),
            accounttype = ko.observable(),
            category = ko.observable(),
            account = ko.observable(),

            activate = function () {
                initLookups();
                account(new model());
                accounttype(new accounttypeModel());
                category(new categoryModel());
                //accounttype(datacontext.createSession());
            },
            initLookups = function () {
                //parentCategories(datacontext.lookups.rooms);
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditAccount = ko.computed(function () {
                return account();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                if (canEditAccount()) {
                    return account().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
            }),
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving();
            }),
            save = function () {

                isSaving(true);
                if (canEditAccount()) {
                    $.when(datacontext.account.addData(account()))
                        .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                function goToEditView(result) {
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/account/show');

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
            account: account,
            goBack: goBack,

            // module page info
            pageDisplayName: 'Create AccountType',
            pageDescription: 'Create a accounttype and let more organized your finances'
        };

        return vm;
    });