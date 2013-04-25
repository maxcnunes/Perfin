define([
    'durandal/plugins/router',
    'services/datacontext',
    'durandal/app',
    'common/breadcrumb',
    'common/config'],
    function (router, datacontext, app, breadcrumb, config) {

        var
            category = ko.observable(),
            parentCategories = ko.observable(),
            isSaving = ko.observable(false),
            isDeleting = ko.observable(false),
            validationErrors = ko.observableArray([]),

            activate = function (routeData) {
                var id = parseInt(routeData.id);
                getCategory(id);
                initLookups(id);
            },
            initLookups = function (currentId) {
                getAllParentCategories();

                function getAllParentCategories() {
                    $.when(datacontext.category.getAllLeastCurrent(currentId))
                     .done(function (items) {
                         parentCategories(items);
                     });
                }
            },
            getCategory = function (currentCategoryId, completeCallback, forceRefresh) {
                var callback = function () {
                    if (completeCallback)
                        completeCallback();

                    validationErrors = ko.validation.group(category());
                };

                datacontext.category.getCategoryById(
					currentCategoryId, {
					    success: function (modelResult) {
					        category(modelResult);
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
            canEditCategory = ko.computed(function () {
                return category() !== undefined;
            }),
            hasChanges = ko.computed(function () {
                if (canEditCategory()) {
                    return category().dirtyFlag().isDirty();
                }
                return false;
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
                    $.when(datacontext.category.updateData(category()))
                        .done(complete);//.fin(complete);
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
                                //datacontext.cancelChanges();
                            }
                            return selectedOption;
                        });
                }
                return true;
            },
            goBack = function () {
                router.navigateBack();
            },
            deleteCategory = function () {
                var msg = 'Delete category "' + category().name() + '" ?';
                var title = 'Confirm Delete';
                isDeleting(true);
                return app.showMessage(msg, title, ['Yes', 'No'])
                        .then(confirmDelete);

                function confirmDelete(selectedOption) {
                    if (selectedOption === 'Yes') {

                        $.when(datacontext.category.deleteData(category()))
                            .then(success)
                            .fail(failed)
                            .done(finish);//.fin(finish);

                        function success() {
                            router.navigateTo('#/category/show');
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
            category: category,
            parentCategories: parentCategories,
            activate: activate,

            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            deleteCategory: deleteCategory,

            // module page info
            pageDisplayName: 'Edit Category',
            pageDescription: 'Edit a category and let more organized your finances',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.category.details)
        };

        return vm;
    });
