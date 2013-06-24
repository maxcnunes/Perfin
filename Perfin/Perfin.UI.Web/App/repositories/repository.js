define([
    'jquery',
    'underscore',
    'ko',
    'models/model',
    'models/model.mapper',
    'services/dataservice',
    'common/config',
    'common/logger',
    'common/utils'],
    function ($, _, ko, model, modelmapper, dataservice, config, logger, utils) {
        var Repository = function (getFunction, mapper, nullo, updateFunction) {
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

                        var getDataFunction = getFunctionOverride || getFunction;

                        // If the internal items object doesnt exist, 
                        // or it exists but has no properties, 
                        // or we force a refresh
                        if (forceRefresh || !items || !utils.hasProperties(items)) {
                            getDataFunction({
                                success: function (dtoList) {
                                    if (options.resultAsDto) {
                                        def.resolve(dtoList);
                                    } else {
                                        items = mapToContext(dtoList, items, results, mapper, filter, sortFunction);
                                        def.resolve(results);
                                    }
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
        };

        var
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
            };

        return Repository;
    });