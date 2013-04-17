// Aggregate all models

define([
    'models/model.category',
    'models/model.user',
    'models/model.accounttype',
    'models/model.account',
    'models/model.entry'],
    function (category, user, accounttype, account, entry) {
        var
            model = {
                Category: category,
                User: user,
                AccountType: accounttype,
                Account: account,
                Entry: entry
            };

        model.setDataContext = function (dc) {
            // Model's that have navegation properties
            // need a reference to the datacontext
            model.Category.datacontext(dc);
            model.User.datacontext(dc);
            model.AccountType.datacontext(dc);
            model.Account.datacontext(dc);
            model.Entry.datacontext(dc);
        };

        return model;
    });