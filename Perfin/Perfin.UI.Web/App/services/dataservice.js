// Aggregate all data services

define([
        'services/dataservice.category',
        'services/dataservice.accounttype',
        'services/dataservice.account',
        'services/dataservice.user'],
    function (category, accounttype, account, user) {
        return {
            category: category,
            accounttype: accounttype,
            account: account,
            user: user
        };

    });