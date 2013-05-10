define([
    'durandal/plugins/router',
    'repositories/datacontext',
    'durandal/app',
    'common/logger',
    'durandal/system',
    'common/breadcrumb',
    'common/config'],
    function (router, datacontext, app, logger, system, breadcrumb, config) {

        var
            vm = this,
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

                    // create backup before any changes
                    category().backup().create();
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
            cleanChanges = function () {
                category().backup().restore();
                return category().dirtyFlag().reset();
            },
            hasChanges = ko.computed(function () {
                return category() ? category().dirtyFlag().isDirty() : false;
            }),
            isValid = function () {
                return validationErrors().length === 0;
            },
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving() && isValid();
            }),
            save = function () {
                isSaving(true);
   
                $.when(datacontext.category.updateData(category()))
                    .done(complete);//.fin(complete);
                
                function complete() {
                    cleanChanges();
                    isSaving(false);
                    router.replaceLocation('#/category/show');
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
                            //cancel();
                            var errorMsg = 'Error: ' + error.responseText;
                            logger.error(errorMsg, true, error, system.getModuleId(vm));
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
            canDeactivate: canDeactivate,

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
