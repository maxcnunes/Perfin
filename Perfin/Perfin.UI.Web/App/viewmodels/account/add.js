define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.account',
    'models/model.accounttype',
    'models/model.category',
    'common/breadcrumb',
    'common/config'],
    function (app, datacontext, router, model, accounttypeModel, categoryModel, breadcrumb, config) {

        var
            isSaving = ko.observable(false),
            account = ko.observable(),
            accounttypes = ko.observable(),
            categories = ko.observable(),


            activate = function () {
                //debugger;
                initLookups();
                account(new model());
                validationErrors = ko.validation.group(account());//apply validation
            },
            initLookups = function () {
                debugger;
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
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditAccount = ko.computed(function () {
                return account();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                debugger;
                if (canEditAccount()) {
                    return account().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
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
            accounttypes: accounttypes,
            categories: categories,

            // module page info
            pageDisplayName: 'Create AccountType',
            pageDescription: 'Create a accounttype and let more organized your finances',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.account.add)
        };

        return vm;
    });