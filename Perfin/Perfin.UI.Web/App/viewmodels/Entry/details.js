define([
    'durandal/plugins/router',
    'repositories/datacontext',
    'durandal/app',
    'models/model.category',
    'models/model.typeTransaction',
    'common/breadcrumb',
    'common/config'],
    function (router, datacontext, app, categoryModel, typeTransaction, breadcrumb, config) {

        var
            entry = ko.observable(),
            categories = ko.observable(),
            typeTransactions = ko.observable(),
            validationErrors = ko.observableArray([]),

            isSaving = ko.observable(false),
            isDeleting = ko.observable(false),

            activate = function (routeData) {
                var id = parseInt(routeData.id);
                initLookups();
                return getEntry(id);
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
            getEntry = function (currentEntryId, completeCallback, forceRefresh) {
                var callback = function () {
                    if (completeCallback) { completeCallback(); }
                    validationErrors = ko.validation.group(entry());

                    // create backup before any changes
                    entry().backup().create();
                };

                datacontext.entry.getEntryById(
					currentEntryId, {
					    success: function (modelResult) {
					        entry(modelResult);
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
            cleanChanges = function () {
                entry().backup().restore();
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
                $.when(datacontext.entry.updateData(entry()))
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
                                cleanChanges();
                            }
                            return selectedOption;
                        });
                }
                return true;

            },
            goBack = function () {
                router.navigateBack();
            },
            deleteItem = function () {
                var msg = 'Delete this entry ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);

                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.entry.deleteData(entry()))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            router.navigateTo('#/entry/show');
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
            activate: activate,
            canDeactivate: canDeactivate,
            entry: entry,
            categories: categories,
            typeTransactions: typeTransactions,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            deleteItem: deleteItem,

            // module page info
            pageDisplayName: 'Edit Entry',
            pageDescription: 'Edit a entry and let more organized your finances',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.entry.details)
        };

        return vm;
    });
