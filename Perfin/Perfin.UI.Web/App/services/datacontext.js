
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
            };


            //--------------------------------------
            // Repositories
            //
            // Pass:
            // dataservice's 'get' method
            // model mapper
            //--------------------------------------
            categoryRepository = new EntitySet(dataservice.category.getCatetories, modelmapper.category, model.Category.Nullo);
            userRepository = new EntitySet(dataservice.user.getUsers, modelmapper.user, model.User.Nullo);
            accountRepository = new EntitySet(dataservice.account.getUsers, modelmapper.account, model.AccountType.Nullo);
            accounttypeRepository = new EntitySet(dataservice.accounttype.getAccountType, modelmapper.accounttype, model.AccountType.Nullo);

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
                    error: function (response) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject(response);
                    }
                }, categoryModel.id());
            }).promise();
        };


        // Extend Users entitySet
        //----------------------------
        userRepository.getAll = function (options) {
            return $.Deferred(function (def) {
                _.extend(options, {
                    // dataservice getUsers function
                    getFunctionOverride: dataservice.user.getUsers
                });
                $.when(userRepository.getData(options))
                    .done(function () { def.resolve(); })
                    .fail(function () { def.reject(); });
            }).promise();
        };

        userRepository.addData = function (userModel, callbacks) {
            var userModelJson = ko.toJSON(userModel);

            return $.Deferred(function (def) {
                dataservice.user.addUser({
                    success: function (dto) {
                        if (!dto) {
                            logger.error(config.messages.errorSavingData, true);

                            if (callbacks && callbacks.error)
                                callbacks.error();

                            def.reject(); // reject: Reject a Deferred object and call any failCallbacks with the given args.
                            return;
                        }

                        var newUser = modelmapper.user.fromDto(dto); // Map DTO to Model
                        userRepository.add(newUser); // Add to datacontext

                        logger.success(config.messages.savedData, true);

                        if (callbacks && callbacks.success)
                            callbacks.success(newUser);

                        def.resolve(dto); // resolve: Resolve a Deferred object and call any doneCallbacks with the given args.
                    },
                    error: function (response) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject();
                        return;
                    }
                }, userModelJson);
            }).promise(); // promise: Return a Deferred’s Promise object.
        };

        userRepository.getUserById = function (id, callbacks, forceRefresh) {
            return $.Deferred(function (def) {
                var user = userRepository.getLocalById(id);
                if (id !== undefined && (user.isNullo || forceRefresh)) {
                    // if nullo or brief, get fresh from database
                    dataservice.user.getUser({
                        success: function (dto) {
                            // updates the user returned from getLocalById() above
                            user = userRepository.mapDtoToContext(dto);
                            //user.isBrief(false); // now a full item
                            callbacks.success(user);
                            def.resolve(dto);
                        },
                        error: function (response) {
                            logger.error('oops! could not retrieve user ' + id, true);
                            if (callbacks && callbacks.error) { callbacks.error(response); }
                            def.reject(response);
                        }
                    },
                    id);
                } else {
                    callbacks.success(user);
                    def.resolve(user);
                }
            }).promise();
        };

        userRepository.updateData = function (userModel, callbacks) {
            var userModelJson = ko.toJSON(userModel);

            return $.Deferred(function (def) {
                dataservice.user.updateUser({
                    success: function (response) {
                        logger.success(config.messages.savedData, true);
                        userModel.dirtyFlag().reset();
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
                }, userModelJson);
            }).promise();
        };

        userRepository.deleteData = function (userModel, callbacks) {
            var userModelJson = ko.toJSON(userModel);

            return $.Deferred(function (def) {
                dataservice.user.deleteUser({
                    success: function (response) {
                        userRepository.removeById(userModel.id());
                        logger.success(config.messages.saveData);
                        if (callbacks && callbacks.success)
                            callbacks.success();
                        def.resolve(response);
                    },
                    error: function (response) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject(response);
                    }
                }, userModel.id());
            }).promise();
        };


        // Extend AccountType entitySet
        //----------------------------
        accounttypeRepository.getAll = function (options) {
            return $.Deferred(function (def) {
                _.extend(options, {
                    // dataservice getUsers function
                    getFunctionOverride: dataservice.accounttype.getAccountType
                });
                $.when(userRepository.getData(options))
                    .done(function () { def.resolve(); })
                    .fail(function () { def.reject(); });
            }).promise();
        };

        accounttypeRepository.addData = function (accounttypeModel, callbacks) {
            var accounttypeModelJson = ko.toJSON(accounttypeModel);

            return $.Deferred(function (def) {
                dataservice.accounttype.addAccountType({
                    success: function (dto) {
                        if (!dto) {
                            logger.error(config.messages.errorSavingData, true);

                            if (callbacks && callbacks.error)
                                callbacks.error();

                            def.reject(); // reject: Reject a Deferred object and call any failCallbacks with the given args.
                            return;
                        }

                        var newAccountType = modelmapper.accounttype.fromDto(dto); // Map DTO to Model
                        accounttypeRepository.add(newAccountType); // Add to datacontext

                        logger.success(config.messages.savedData, true);

                        if (callbacks && callbacks.success)
                            callbacks.success(newAccountType);

                        def.resolve(dto); // resolve: Resolve a Deferred object and call any doneCallbacks with the given args.
                    },
                    error: function (response) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject();
                        return;
                    }
                }, accounttypeModelJson);
            }).promise(); // promise: Return a Deferred’s Promise object.
        };

        accounttypeRepository.getAccountTypeById = function (id, callbacks, forceRefresh) {
            return $.Deferred(function (def) {
                var accounttype = accounttypeRepository.getLocalById(id);
                if (id !== undefined && (accounttype.isNullo || forceRefresh)) {
                    // if nullo or brief, get fresh from database
                    dataservice.accounttype.getAccountType({
                        success: function (dto) {
                            // updates the accounttype returned from getLocalById() above
                            accounttype = accounttypeRepository.mapDtoToContext(dto);
                            //accounttype.isBrief(false); // now a full item
                            callbacks.success(accounttype);
                            def.resolve(dto);
                        },
                        error: function (response) {
                            logger.error('oops! could not retrieve accounttype ' + id, true);
                            if (callbacks && callbacks.error) { callbacks.error(response); }
                            def.reject(response);
                        }
                    },
                    id);
                } else {
                    callbacks.success(accounttype);
                    def.resolve(accounttype);
                }
            }).promise();
        };

        accounttypeRepository.updateData = function (accounttypeModel, callbacks) {
            var accounttypeModelJson = ko.toJSON(accounttypeModel);

            return $.Deferred(function (def) {
                dataservice.accounttype.updateAccountType({
                    success: function (response) {
                        logger.success(config.messages.savedData, true);
                        accounttypeModel.dirtyFlag().reset();
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
                }, accounttypeModelJson);
            }).promise();
        };

        accounttypeRepository.deleteData = function (accounttypeModel, callbacks) {
            var accounttypeModelJson = ko.toJSON(accounttypeModel);

            return $.Deferred(function (def) {
                dataservice.accounttype.deleteAccountType({
                    success: function (response) {
                        accounttypeRepository.removeById(accounttypeModel.id());
                        logger.success(config.messages.saveData);
                        if (callbacks && callbacks.success)
                            callbacks.success();
                        def.resolve(response);
                    },
                    error: function (response) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject(response);
                    }
                }, accounttypeModel.id());
            }).promise();
        };








        var datacontext = {
            category: categoryRepository,
            user: userRepository,
            accounttype: accounttypeRepository,
            account: accountRepository
        };

        // We did this so we can access the datacontext during its construction
        model.setDataContext(datacontext);

        return datacontext;
    }
);