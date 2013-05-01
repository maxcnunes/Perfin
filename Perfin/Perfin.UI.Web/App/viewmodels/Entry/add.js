define([
    'durandal/app',
    'jquery',
    'moment',
    'repositories/datacontext',
    'durandal/plugins/router',
    'models/model.entry',
    'models/model.category',
    'models/model.typeTransaction',
    'common/breadcrumb',
    'common/config'],
    function (app, $, moment, datacontext, router, model, categoryModel, typeTransaction, breadcrumb, config) {
        var
            self = this,
            isSaving = ko.observable(false),
            entry = ko.observable(),
            categories = ko.observable(),
            typeTransactions = ko.observable(),
            validationErrors = ko.observableArray([]),


            activate = function () {
                initLookups();

                entry(new model());
                //entry().entryDate(moment().toDate());

                validationErrors = ko.validation.group(entry());//apply validation
            },
            initLookups = function () {
                $.when(getAllCategories(), getAllTypeTransactions());

                function getAllCategories() {
                    return $.Deferred(function (def) {
                        $.when(datacontext.category.getData({ results: categories }))
                            .fail(function () { def.reject(); })
                            .done(function () { def.resolve(); });
                    }).promise();
                }
                function getAllTypeTransactions() {
                    typeTransactions(typeTransaction.getAll())
                }
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            cleanChanges = function () {
                return entry().dirtyFlag().reset();
            },
            hasChanges = ko.computed(function () {
                return entry() ? entry().dirtyFlag().isDirty() : false;
            }),
            isValid = function () {
                return validationErrors().length === 0;
            },
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving() && isValid();
            }),
            save = function () {
                isSaving(true);
                $.when(datacontext.entry.addData(entry()))
                    .then(goToEditView)
                    .done(complete); //.fin(complete);

                function goToEditView(result) {
                    cleanChanges();
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/entry/show');
                }

                function complete() {
                    isSaving(false);
                }
            },
            canDeactivate = function () {
                if (hasChanges()) {
                    var msg = 'Do you want to leave and cancel?';
                    return app.showMessage(msg, 'Navigate Away', ['Yes', 'No'])
                        .then(function (selectedOption) {
                            if (selectedOption === 'Yes') {
                                //TODO:
                                //datacontext.cancelChanges();
                            }
                            return selectedOption;
                        });
                }
                return true;
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
            categories: categories,
            typeTransactions: typeTransactions,

            // module page info
            pageDisplayName: 'Create an Entry',
            pageDescription: 'Create an entry and let more organized your finances',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.entry.add)
        };

        return vm;
    });