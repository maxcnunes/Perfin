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
        var accountRepository = new Repository(dataservice.account.getAccounts, modelmapper.account, model.AccountType.Nullo);

        // Extend Repository
        //----------------------------
        accountRepository.getAll = function (options) {
            return $.Deferred(function (def) {
                _.extend(options, {
                    // dataservice getAccounts function
                    getFunctionOverride: dataservice.account.getAccount
                });
                $.when(accountRepository.getData(options))
                    .done(function () { def.resolve(); })
                    .fail(function () { def.reject(); });
            }).promise();
        };

        accountRepository.addData = function (accountModel, callbacks) {
            var accountModelJson = modelmapper.account.toJSON(accountModel);

            return $.Deferred(function (def) {
                dataservice.account.addAccount({
                    success: function (dto) {
                        if (!dto) {
                            logger.error(config.messages.errorSavingData, true);

                            if (callbacks && callbacks.error)
                                callbacks.error();

                            def.reject(); // reject: Reject a Deferred object and call any failCallbacks with the given args.
                            return;
                        }

                        var newAccount = modelmapper.account.fromDto(dto); // Map DTO to Model
                        accountRepository.add(newAccount); // Add to datacontext

                        logger.success(config.messages.savedData, true);

                        if (callbacks && callbacks.success)
                            callbacks.success(newAccount);

                        def.resolve(dto); // resolve: Resolve a Deferred object and call any doneCallbacks with the given args.
                    },
                    error: function (response) {
                        logger.error(config.messages.errorSavingData);
                        if (callbacks && callbacks.error)
                            callbacks.error();
                        def.reject();
                        return;
                    }
                }, accountModelJson);
            }).promise(); // promise: Return a Deferred’s Promise object.
        };

        accountRepository.getAccountById = function (id, callbacks, forceRefresh) {
            return $.Deferred(function (def) {
                var account = accountRepository.getLocalById(id);
                if (id !== undefined && (account.isNullo || forceRefresh)) {
                    // if nullo or brief, get fresh from database
                    dataservice.account.getAccount({
                        success: function (dto) {
                            // updates the account returned from getLocalById() above
                            account = accountRepository.mapDtoToContext(dto);
                            //account.isBrief(false); // now a full item
                            callbacks.success(account);
                            def.resolve(dto);
                        },
                        error: function (response) {
                            logger.error('oops! could not retrieve account ' + id, true);
                            if (callbacks && callbacks.error) { callbacks.error(response); }
                            def.reject(response);
                        }
                    },
                    id);
                } else {
                    callbacks.success(account);
                    def.resolve(account);
                }
            }).promise();
        };

        accountRepository.updateData = function (accountModel, callbacks) {
            var accountModelJson = modelmapper.account.toJSON(accountModel);

            return $.Deferred(function (def) {
                dataservice.account.updateAccount({
                    success: function (response) {
                        logger.success(config.messages.savedData, true);
                        accountModel.dirtyFlag().reset();
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
                }, accountModelJson);
            }).promise();
        };

        accountRepository.deleteData = function (accountModel, callbacks) {
            var accountModelJson = ko.toJSON(accountModel);

            return $.Deferred(function (def) {
                dataservice.account.deleteAccount({
                    success: function (response) {
                        accountRepository.removeById(accountModel.id());
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
                }, accountModel.id());
            }).promise();
        };

        return accountRepository;
    });