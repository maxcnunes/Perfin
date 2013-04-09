define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.category'],
    function (app, datacontext, router, model) {


        var
            isSaving = ko.observable(false),
            category = ko.observable(),
            parentCategories = ko.observable(),

            activate = function () {
                initLookups();
                category(new model());
            },
            initLookups = function () {
                getAllParentCategories();

                function getAllParentCategories() {
                    return $.Deferred(function (def) {
                        $.when(datacontext.category.getData({ results: parentCategories }))
                            .fail(function () { def.reject(); })
                            .done(function () { def.resolve(); });
                    }).promise();
                }
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditCategory = ko.computed(function () {
                return category();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                if (canEditCategory()) {
                    return category().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
            }),
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving();
            }),
            save = function () {

                isSaving(true);
                if (canEditCategory()) {
                    $.when(datacontext.category.addData(category()))
                        .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                function goToEditView(result) {
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/category/show');

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
            };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            category: category,
            parentCategories: parentCategories,
            save: save,

            // module page info
            pageDisplayName: 'Create Category',
            pageDescription: 'Create a category and let more organized your finances'
        };

        return vm;
    });