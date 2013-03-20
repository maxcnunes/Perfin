define([
    'durandal/plugins/router',
    'repositories/category'],
    function (router, repository) {

    return {
        categoryToShow: {
            name: ko.observable(),
            parent: ko.observable()
        },

        activate: function (context) {
            // Grab item from repository
            var category = repository.getCategory(context.id);

            // Add to view model
            this.categoryToShow.name(category.name);
            this.categoryToShow.parent(category.parent);
        }
    };

});