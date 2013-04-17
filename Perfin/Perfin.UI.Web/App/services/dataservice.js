// Aggregate all data services

define([
        'services/dataservice.category',
        'services/dataservice.accounttype',
        'services/dataservice.account',
        'services/dataservice.user',
        'services/dataservice.entry'],
    function (category, accounttype, account, user, entry) {
        return {
            category: category,
            accounttype: accounttype,
            account: account,
            user: user,
            entry: entry
        };

    });