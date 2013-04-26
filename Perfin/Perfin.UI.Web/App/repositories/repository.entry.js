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
    	var entryRepository = new Repository(dataservice.entry.getEntries, modelmapper.entry, model.Entry.Nullo);

    	// Extend Repository
    	//----------------------------
    	entryRepository.getAll = function (options) {
    		return $.Deferred(function (def) {
    			_.extend(options, {
    				// dataservice getEntries function
    				getFunctionOverride: dataservice.entry.getEntry
    			});
    			$.when(entryRepository.getData(options))
                    .done(function () { def.resolve(); })
                    .fail(function () { def.reject(); });
    		}).promise();
    	};

    	entryRepository.addData = function (entryModel, callbacks) {
    		var entryModelJson = modelmapper.entry.toJSON(entryModel);

    		return $.Deferred(function (def) {
    			dataservice.entry.addEntry({
    				success: function (dto) {
    					if (!dto) {
    						logger.error(config.messages.errorSavingData, true);

    						if (callbacks && callbacks.error)
    							callbacks.error();

    						def.reject(); // reject: Reject a Deferred object and call any failCallbacks with the given args.
    						return;
    					}

    					var newEntry = modelmapper.entry.fromDto(dto); // Map DTO to Model
    					entryRepository.add(newEntry); // Add to datacontext

    					logger.success(config.messages.savedData, true);

    					if (callbacks && callbacks.success)
    						callbacks.success(newEntry);

    					def.resolve(dto); // resolve: Resolve a Deferred object and call any doneCallbacks with the given args.
    				},
    				error: function (response) {
    					logger.error(config.messages.errorSavingData);
    					if (callbacks && callbacks.error)
    						callbacks.error();
    					def.reject();
    					return;
    				}
    			}, entryModelJson);
    		}).promise(); // promise: Return a Deferred’s Promise object.
    	};

    	entryRepository.getEntryById = function (id, callbacks, forceRefresh) {
    		return $.Deferred(function (def) {
    			var entry = entryRepository.getLocalById(id);
    			if (id !== undefined && (entry.isNullo || forceRefresh)) {
    				// if nullo or brief, get fresh from database
    				dataservice.entry.getEntry({
    					success: function (dto) {
    						// updates the entry returned from getLocalById() above
    						entry = entryRepository.mapDtoToContext(dto);
    						//entry.isBrief(false); // now a full item
    						callbacks.success(entry);
    						def.resolve(dto);
    					},
    					error: function (response) {
    						logger.error('oops! could not retrieve entry ' + id, true);
    						if (callbacks && callbacks.error) { callbacks.error(response); }
    						def.reject(response);
    					}
    				},
                    id);
    			} else {
    				callbacks.success(entry);
    				def.resolve(entry);
    			}
    		}).promise();
    	};

    	entryRepository.updateData = function (entryModel, callbacks) {
    		var entryModelJson = modelmapper.entry.toJSON(entryModel);

    		return $.Deferred(function (def) {
    			dataservice.entry.updateEntry({
    				success: function (response) {
    					logger.success(config.messages.savedData, true);
    					entryModel.dirtyFlag().reset();
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
    			}, entryModelJson);
    		}).promise();
    	};

    	entryRepository.deleteData = function (entryModel, callbacks) {
    		var entryModelJson = ko.toJSON(entryModel);

    		return $.Deferred(function (def) {
    			dataservice.entry.deleteEntry({
    				success: function (response) {
    					entryRepository.removeById(entryModel.id());
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
    			}, entryModel.id());
    		}).promise();
    	};

    	return entryRepository;
    });