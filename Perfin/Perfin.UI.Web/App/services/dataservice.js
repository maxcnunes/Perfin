// Aggregate all data services

define([
        'services/dataservice.category',
        'services/dataservice.user'],
    function (category, user) {
        return {
            category: category,
            user: user
        };

    });