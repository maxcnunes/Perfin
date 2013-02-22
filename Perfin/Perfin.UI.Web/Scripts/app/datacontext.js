// NOT COMPLETED YET

define('datacontext',
    ['jquery', 'underscore', 'ko', 'model', 'model.mapper', 'dataservice', 'config', 'utlis'],
    function ($, _, ko, model, modelmapper, dataservice, config, utils) {

        // Private Members
        var
            logger = config.logger,
            getCurrentUserId = function () {
                return config.currentUser().id();
            },

    }
);