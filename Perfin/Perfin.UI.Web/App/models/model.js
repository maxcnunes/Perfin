// Aggregate all models

define([
    'models/model.category',
    'models/model.user',
    'models/model.account'],
    function (category, user, account) {
        var
            model = {
                // Category Model
                Category: category,
                User: user,
                Account: account
            };

        model.setDataContext = function (dc) {
            // Model's that have navegation properties
            // need a reference to the datacontext
            model.Category.datacontext(dc);
            model.User.datacontext(dc);
            model.Account.datacontext(dc);
        };

        return model;
    });