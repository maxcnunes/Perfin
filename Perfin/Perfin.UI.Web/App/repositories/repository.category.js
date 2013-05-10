define([
    'jquery',
    'underscore',
    'ko',
    'models/model',
    'models/model.mapper',
    'services/dataservice',
    'common/config',
    'common/logger',
    'common/utils',
    'repositories/repository'],
    function ($, _, ko, model, modelmapper, dataservice, config, logger, utils, Repository) {
        var categoryRepository = new Repository(dataservice.category.getCatetories, modelmapper.category, model.Category.Nullo);

        // Extend Repository
        //----------------------------
        categoryRepository.getAllLeastCurrent = function (id, options) {
            var allCategories = ko.observable();

            // extend the options
            options = options || {};
            _.extend(options, {
                results: allCategories
            });

            return $.Deferred(function (def) {
                $.when(categoryRepository.getData({ results: allCategories }))
                    .fail(function () { def.reject(); })
                    .done(function () {
                        // get just the other categories 
                        var allParent = _.reject(allCategories(), function (item) {
                            return item.id() == id;
                        });

                        def.resolve(allParent);
                    });
            }).promise();
        }

        categoryRepository.addData = function (categoryModel, callbacks) {
            var categoryModelJson = ko.toJSON(categoryModel);

            return $.Deferred(function (def) {
                dataservice.category.addCategory({
                    success: function (dto) {
                        if (!dto) {
                            logger.error(config.messages.errorSavingData, true);

                            if (callbacks && callbacks.error)
                                callbacks.error();

                            def.reject(); // reject: Reject a Deferred object and call any failCallbacks with the given args.
                            return;
                        }

                        var newCategory = modelmapper.category.fromDto(dto); // Map DTO to Model
                        categoryRepository.add(newCategory); // Add to datacontext

                        logger.success(config.messages.savedData, true);

                        if (callbacks && callbacks.success)
                            callbacks.success(newCategory);

                        def.resolve(dto); // resolve: Resolve a Deferred object and call any doneCallbacks with the given args.
                    },
                    error: function (response) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject();
                        return;
                    }
                }, categoryModelJson);
            }).promise(); // promise: Return a Deferred’s Promise object.
        };

        categoryRepository.getCategoryById = function (id, callbacks, forceRefresh) {
            return $.Deferred(function (def) {
                var category = categoryRepository.getLocalById(id);
                if (id !== undefined && (category.isNullo || forceRefresh)) {
                    // if nullo or brief, get fresh from database
                    dataservice.category.getCategory({
                        success: function (dto) {
                            // updates the category returned from getLocalById() above
                            category = categoryRepository.mapDtoToContext(dto);
                            //category.isBrief(false); // now a full item
                            callbacks.success(category);
                            def.resolve(dto);
                        },
                        error: function (response) {
                            logger.error('oops! could not retrieve category ' + id, true);
                            if (callbacks && callbacks.error) { callbacks.error(response); }
                            def.reject(response);
                        }
                    },
                    id);
                } else {
                    callbacks.success(category);
                    def.resolve(category);
                }
            }).promise();
        };

        categoryRepository.updateData = function (categoryModel, callbacks) {
            var categoryModelJson = ko.toJSON(categoryModel);

            return $.Deferred(function (def) {
                dataservice.category.updateCategory({
                    success: function (response) {
                        logger.success(config.messages.savedData, true);
                        categoryModel.dirtyFlag().reset();
                        if (callbacks && callbacks.success)
                            callbacks.success();
                        def.resolve(response);
                    },
                    error: function (response) {
                        logger.error(config.messages.errorSavingData, true);
                        if (callbacks && callbacks.error) { callbacks.error(); }
                        def.reject(response);
                        return;
                    }
                }, categoryModelJson);
            }).promise();
        };

        categoryRepository.deleteData = function (categoryModel, callbacks) {
            var categoryModelJson = ko.toJSON(categoryModel);

            return $.Deferred(function (def) {
                dataservice.category.deleteCategory({
                    success: function (response) {
                        categoryRepository.removeById(categoryModel.id());
                        logger.success(config.messages.saveData);
                        if (callbacks && callbacks.success)
                            callbacks.success();
                        def.resolve(response);
                    },
                    error: function (response, status) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject(response);
                    }
                }, categoryModel.id());
            }).promise();
        };

        return categoryRepository;
    });