// Aggregate all data services
define([
        'services/dataservice.category',
        'services/dataservice.accounttype',
        'services/dataservice.account',
        'services/dataservice.user',
        'services/dataservice.assets'],
    function (category, accounttype, account, user, assets) {
        return {
            category: category,
            accounttype: accounttype,
            account: account,
            user: user,
            assets: assets
        };
    });