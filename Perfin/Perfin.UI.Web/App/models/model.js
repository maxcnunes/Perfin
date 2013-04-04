// Aggregate all models

define([
    'models/model.category',
    'models/model.user'],
    function (category, user) {
        var
            model = {
                // Category Model
                Category: category,
                User: user
            };

        model.setDataContext = function (dc) {
            // Model's that have navegation properties
            // need a reference to the datacontext
            model.Category.datacontext(dc);
            model.User.datacontext(dc);
        };

        return model;
    });