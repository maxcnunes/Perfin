// Aggregate all models

define([
    'models/model.category',
    'models/model.user',
    'models/model.entry'],
    function (category, user, entry) {
        var
            model = {
                Category: category,
                User: user,
                Entry: entry
            };

        model.setDataContext = function (dc) {
            // Model's that have navegation properties
            // need a reference to the datacontext
            model.Category.datacontext(dc);
            model.User.datacontext(dc);
            model.Entry.datacontext(dc);
        };

        return model;
    });