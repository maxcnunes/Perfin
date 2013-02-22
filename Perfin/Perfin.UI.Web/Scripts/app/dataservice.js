// Aggregate all data services

define('dataservice',
    [
        'dataservice.category'
    ],
    function (category) {
        return {
            category: category
        };

    });