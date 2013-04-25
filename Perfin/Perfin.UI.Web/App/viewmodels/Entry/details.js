define([
    'durandal/plugins/router',
    'services/datacontext',
    'durandal/app'],
    function (router, datacontext, app) {

        var
            entry = ko.observable(),
            categories = ko.observable(), //????????
            accounts = ko.observable(),
            selectedEntry = ko.observable(),

            isSaving = ko.observable(false),
            isDeleting = ko.observable(false),

            activate = function (routeData) {
                debugger;
                var id = parseInt(routeData.id);
                initLookups();
                return getEntry(id);
            },
            initLookups = function () {
                $.when(getAllCategories());

                function getAllCategories() {
                    return $.Deferred(function (def) {
                        $.when(datacontext.category.getData({ results: categories }))
                            .fail(function () { def.reject(); })
                            .done(function () { def.resolve(); });
                    }).promise();
                }

            },
            getEntry = function (currentEntryId, completeCallback, forceRefresh) {
                var callback = function () {
                    if (completeCallback) { completeCallback(); }
                    validationErrors = ko.validation.group(entry());
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
            canEditEntry = ko.computed(function () {
                return entry();
            }),
            hasChanges = ko.computed(function () {
                if (canEditEntry()) {
                    return entry().dirtyFlag().isDirty();
                }
                return false;
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
                    $.when(datacontext.entry.updateData(entry()))
                        .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                function goToEditView(result) {
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/entry/show');
                }

                function complete() {
                    isSaving(false);
                }
            },

            canDeactivate = function () {
                return true;

            },
            goBack = function () {
                router.navigateBack();
            },
            deleteItem = function () {
                var msg = 'Delete entry "' + entry().paymentdate() + '" ?';
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
            entry: entry,
            categories: categories,
            accounts: accounts,
            selectedEntry :selectedEntry ,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            deleteItem: deleteItem,

            // module page info
            pageDisplayName: 'Edit Entry',
            pageDescription: 'Edit a entry and let more organized your finances'
        };

        return vm;
    });
