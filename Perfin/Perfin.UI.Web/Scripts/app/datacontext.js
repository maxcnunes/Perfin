// NOT COMPLETED YET

define('datacontext',
    ['jquery', 'underscore', 'ko', 'model', 'model.mapper', 'dataservice', 'config', 'utils'],
    function ($, _, ko, model, modelmapper, dataservice, config, utils) {

        // Private Members
        var
            logger = config.logger,
            getCurrentUserId = function () {
                return config.currentUser().id();
            },
            itemsToArray = function (items, observableArray, filter, sortFunction) {
                // Maps the memo to an observableArray,
                // then returns the observableArray
                if (!observableArray)
                    return;

                // Create an array from the memo object
                var underlyingArray = utils.mapMemoToArray(items);

                if (filter) {
                    underlyingArray = _.filter(underlyingArray, function () {
                        var match = filter.predicate(filter, o);
                        return match;
                    });
                }

                if (sortFunction) {
                    underlyingArray.sort(sortFunction);
                }

                observableArray(underlyingArray);
            },
            mapToContext = function (dtoList, items, results, mapper, filter, sortFunction) {
                // Loop through the raw dto list and populate a dictionary of the items
                items = _.reduce(dtoList, function (memo, dto) {
                    var id = mapper.getDtoId(dto);
                    var existingItem = items[id];
                    memo[id] = mapper.fromDto(dto, existingItem);
                    return memo;
                }, {});
                itemsToArray(items, results, filter, sortFunction);
                return items;
            },
            EntitySet = function (getFunction, mapper, nullo, updateFunction) {
                var
                    items = {},
                    //returns the model item produced by merging dto into context
                    mapDtoToContext = function (dto) {
                        var id = mapper.getDtoId(dto);
                        var existingItem = items[id];
                        items[id] = mapper.fromDto(dto, existingItem);
                        return items[id];
                    },
                    add = function (newObj) {
                        items[newObj.id()] = newObj;
                    },
                    removeById = function (id) {
                        delete items[id];
                    },
                    getLocalById = function (id) {
                        // This is the only place we set to NULLO
                        return !!id && !!items[id] ? items[id] : nullo;
                    },
                    getAllLocal = function () {
                        return utils.mapMemoToArray(items);
                    },
                    getData = function (options) {
                        return $.Deferred(function (def) {
                            var
                                results = options && options.results,
                                sortFunction = options && options.sortFunction,
                                filter = options && options.filter,
                                forceRefresh = options && options.forceRefresh,
                                param = options && options.param,
                                getFunctionOverride = options && options.getFunctionOverride;

                            getFunction = getFunctionOverride || getFunction;

                            // If the internal items object doesnt exist, 
                            // or it exists but has no properties, 
                            // or we force a refresh
                            if (forceRefresh || !items || !utils.hasProperties(items)) {
                                getFunction({
                                    success: function (dtoList) {
                                        items = mapToContext(dtoList, items, results, mapper, filter, sortFunction);
                                        def.resolve(results);
                                    },
                                    error: function (response) {
                                        logger.error(config.toasts.errorGettingData);
                                        def.reject();
                                    }
                                }, param);
                            } else {
                                itemsToArray(items, results, filter, sortFunction);
                                def.resolve(results);
                            }
                        }).promise();
                    },
                    updateData = function (entity, callbacks) {

                        var entityJson = ko.toJSON(entity);

                        return $.Deferred(function (def) {
                            if (!updateFunction) {
                                logger.error('updateData method not implemented');
                                if (callbacks && callbacks.error) { callbacks.error(); }
                                def.reject();
                                return;
                            }

                            updateFunction({
                                success: function (response) {
                                    logger.success(config.toasts.savedData);
                                    entity.dirtyFlag().reset();
                                    if (callbacks && callbacks.success) { callbacks.success(); }
                                    def.resolve(response);
                                },
                                error: function (response) {
                                    logger.error(config.toasts.errorSavingData);
                                    if (callbacks && callbacks.error) { callbacks.error(); }
                                    def.reject(response);
                                    return;
                                }
                            }, entityJson);
                        }).promise();
                    };

                return {
                    mapDtoToContext: mapDtoToContext,
                    add: add,
                    getAllLocal: getAllLocal,
                    getLocalById: getLocalById,
                    getData: getData,
                    removeById: removeById,
                    updateData: updateData
                };
            },


            //--------------------------------------
            // Repositories
            //
            // Pass:
            // dataservice's 'get' method
            // model mapper
            //--------------------------------------
            categories = new EntitySet(dataservice.category.getCatetories, modelmapper.cateogry, model.Category.Nullo);


        // Extend Categories entitySet
        //----------------------------

        categories.getCategoryById = function (categoryModel, callbacks, forceRefresh) {
            //return $.Deferred(function (def) {
            //    var
            //        id = categoryModel.id(),
            //        cat = categories.getLocalById(id);

            //    if (cat.isNullo || forceRefresh) {
            //        // get fresh from database
            //        dataservice.category.getCategory(
            //            {
            //                success: function (dto) {
            //                    // updates the session returned from getLocalById() above
            //                    cat = categories.mapDtoToContext(dto);
            //                    if (callbacks && callbacks.success) { callbacks.success(cat); }
            //                    def.resolve(dto);
            //                },
            //                error: function (response) {
            //                    logger.error('oops! could not retrieve categories ' + categoryId);
            //                    if (callbacks && callbacks.error) { callbacks.error(response); }
            //                    def.reject(response);
            //                }
            //            },
            //            getCurrentUserId(),
            //            categoryId
            //        );
            //    } else {
            //        if (callbacks && callbacks.success) { callbacks.success(cat); }
            //        def.resolve(cat);
            //    }
            //}).promise();
        };

        categories.addData = function (categoryModel, callbacks) {
            var categoryModelJson = ko.toJson(categoryModel);

            return $.Deferred(function (def) {
                dataservice.category.addCategory({
                    success: function (dto) {
                        if (!dto) {
                            logger.error(config.toasts.errorSavingData);

                            if (callbacks && callbacks.error)
                                callbacks.error();

                            def.reject(); // reject: Reject a Deferred object and call any failCallbacks with the given args.
                            return;
                        }

                        var newCategory = modelmapper.category.fromDto(dto); // Map DTO to Model
                        categories.add(newCategory); // Add to datacontext

                        logger.success(config.toasts.savedData);

                        if (callbacks && callbacks.success)
                            callbacks.success(newCategory);

                        def.resolve(dto); // resolve: Resolve a Deferred object and call any doneCallbacks with the given args.
                    },
                    error: function (response) {
                        logger.error(config.toasts.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject();
                        return;
                    }
                }, categoryModelJson);
            }).promise(); // promise: Return a Deferred’s Promise object.
        };

        categories.updateData = function (categoryModel, callbacks) {
            var categoryModelJson = ko.toJson(categoryModel);

            return $.Deferred(function (def) {
                dataservice.category.updateCategory({
                    success: function (response) {
                        logger.success(config.toasts.savedData);
                        categoryModel.dirtyFlag().reset();
                        if (callbacks && callbacks.success)
                            callbacks.success();
                        def.resolve(response);
                    },
                    error: function (response) {
                        logger.error(config.toasts.errorSavingData);
                        if (callbacks && callbacks.error) { callbacks.error(); }
                        def.reject(response);
                        return;
                    }
                }, categoryModelJson);
            }).promise();
        };

        categories.deleteData = function (categoryModel, callbacks) {
            var categoryModelJson = ko.toJson(categoryModel);

            return $.Deferred(function (def) {
                dataservice.category.deleteCategory({
                    success: function (response) {
                        categories.removeById(categoryModel.id());
                        logger.success(config.toasts.saveData);
                        if (callbacks && callbacks.success)
                            callbacks.sucess();
                        def.resolve(response);
                    },
                    error: function (response) {
                        logger.error(config.toasts.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject(response);
                    }
                }, categoryModel.id());
            }).promise();
        };



        var datacontext = {
            categories: categories
        };

        // We did this so we can access the datacontext during its construction
        model.setDataContext(datacontext);

        return datacontext;
    }
);