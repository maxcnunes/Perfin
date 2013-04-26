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
    	var assetsRepository = {};

    	// Extend Repository
    	//----------------------------
    	assetsRepository.getData = function () {
    		return $.Deferred(function (def) {
    			$.when(dataservice.assets.getAssets({
    				success: function (dtoList) {
    					def.resolve(dtoList);
    				},
    				error: function (response) {
    					logger.error(config.messages.errorGettingData, true);
    					def.reject();
    				}
    			}));
    		}).promise();
    	};

    	return assetsRepository;
    });