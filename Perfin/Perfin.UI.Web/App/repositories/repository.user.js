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
        var userRepository = new Repository(dataservice.user.getUsers, modelmapper.user, model.User.Nullo);

        // Extend Repository
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

        userRepository.getUserInfoAuth0 = function (accessToken, callbacks, forceRefresh) {
            return $.Deferred(function (def) {
                var user = userRepository.getLocalById(id);
                if (accessToken !== undefined && (user.isNullo || forceRefresh)) {
                    // if nullo or brief, get fresh from database
                    dataservice.user.getUserInfoAuth0({
                        success: function (dto) {
                            var user = modelmapper.user.fromAuth0Dto(dto); // Map DTO to Model
                            def.resolve(dto);
                        },
                        error: function (response) {
                            logger.error('oops! could not retrieve user ', true);
                            if (callbacks && callbacks.error) { callbacks.error(response); }

                            //if (response.status == 401) {
                            //    //Unauthorized
                            //}

                            def.reject(response);
                        }
                    },
                    accessToken);
                } else {
                    callbacks.success(user);
                    def.resolve(user);
                }
            }).promise();
        };

        userRepository.importData = function (userModel, callbacks) {
            var userModelJson = ko.toJSON(userModel);

            return $.Deferred(function (def) {
                dataservice.user.importUser({
                    success: function (dto) {
                        if (!dto) {
                            onError();
                            return;
                        }

                        var user = modelmapper.user.fromDto(dto); // Map DTO to Model
                        if (userRepository.getLocalById(user.id()).isNullo) {
                            userRepository.add(user); // Add to datacontext
                        }

                        logger.success(config.messages.savedData, true);
                        if (callbacks && callbacks.success) { callbacks.success(user); }
                        def.resolve(dto);
                    },
                    error: onError
                }, userModelJson);

                function onError(response) {
                    logger.error(config.messages.errorSavingData);
                    if (callbacks && callbacks.error) { callbacks.error(); }
                    def.reject();
                }
            }).promise();
        };

        return userRepository;
    });