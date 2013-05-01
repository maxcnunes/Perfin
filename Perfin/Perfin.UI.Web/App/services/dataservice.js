// Aggregate all data services
define([
        'services/dataservice.category',
        'services/dataservice.user',
        'services/dataservice.assets',
        'services/dataservice.entry'],
    function (category, user, assets, entry) {
        return {
            category: category,
            user: user,
            assets: assets,
            entry: entry
        };
    });