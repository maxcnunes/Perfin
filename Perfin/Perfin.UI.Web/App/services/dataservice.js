// Aggregate all data services

define([
        'services/dataservice.category'],
    function (category) {
        return {
            category: category
        };

    });