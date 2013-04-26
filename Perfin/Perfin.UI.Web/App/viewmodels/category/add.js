define([
    'durandal/app',
    'repositories/datacontext',
    'durandal/plugins/router',
    'models/model.category',
    'common/breadcrumb',
    'common/config'],
    function (app, datacontext, router, model, breadcrumb, config) {


        var
            vm = this,
            isSaving = ko.observable(false),
            category = ko.observable(),
            parentCategories = ko.observable(),
            validationErrors = ko.observableArray([]),

            activate = function () {
                initLookups();
                category(new model());
                validationErrors = ko.validation.group(category());//apply validation
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
            isValid = function () {
                return canEditCategory() ? validationErrors().length === 0 : true;
            },
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving() && isValid();
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
            },
            goBack = function () {
                router.navigateBack();
            };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            goBack:goBack,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            category: category,
            parentCategories: parentCategories,
            save: save,

            // module page info
            pageDisplayName: 'Create Category',
            pageDescription: 'Create a category and let more organized your finances',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.category.add)
        };

        return vm;
    });