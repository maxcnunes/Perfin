
define([
    'jquery',
    'underscore',
    'ko',
    'models/model',
    'models/model.mapper',
    'services/dataservice',
    'config',
    'services/logger',
    'common/utils'],
    function (
        $,
        _,
        ko,
        model,
        modelmapper,
        dataservice,
        config,
        logger,
        utils) {

        var
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
                                        logger.error(config.messages.errorGettingData, true);
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
                                logger.error('updateData method not implemented', true);
                                if (callbacks && callbacks.error) { callbacks.error(); }
                                def.reject();
                                return;
                            }

                            updateFunction({
                                success: function (response) {
                                    logger.success(config.messages.savedData, true);
                                    entity.dirtyFlag().reset();
                                    if (callbacks && callbacks.success) { callbacks.success(); }
                                    def.resolve(response);
                                },
                                error: function (response) {
                                    logger.error(config.messages.errorSavingData, true);
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
            categoryRepository = new EntitySet(dataservice.category.getCatetories, modelmapper.category, model.Category.Nullo);


        // Extend Categories entitySet
        //----------------------------
        categoryRepository.getAll = function (callback) {
            return $.Deferred(function (def) {
                _.extend(options, {
                    // dataservice getCatetories function
                    getFunctionOverride: dataservice.category.getCatetories
                });
                $.when(persons.getData(options))
                    .done(function () { def.resolve(); })
                    .fail(function () { def.reject(); });
            }).promise();
        };

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

        var datacontext = {
            category: categoryRepository
        };

        // We did this so we can access the datacontext during its construction
        model.setDataContext(datacontext);

        return datacontext;
    }
);