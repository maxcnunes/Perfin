// Aggregate all custom sorts

define('sort', [], function () {

    // Private Members
    var
        categorySort = function (categoryA, categoryB) {
            return categoryA.name() > categoryB.name() ? 1 : -1;
        };

    // Public Members
    return {
        categorySort: categorySort
    }
});