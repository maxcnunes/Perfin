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
        var accounttypeRepository = new Repository(dataservice.accounttype.getAccountTypes, modelmapper.accounttype, model.AccountType.Nullo);

        // Extend Repository
        //----------------------------
        accounttypeRepository.getAll = function (options) {
            return $.Deferred(function (def) {
                _.extend(options, {
                    // dataservice getUsers function
                    getFunctionOverride: dataservice.accounttype.getAccountType
                });
                $.when(accounttypeRepository.getData(options))
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

        return accounttypeRepository;
    });