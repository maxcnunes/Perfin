define(
    ['repositories/category'],
    function (repository) {
        return {
            categories: ko.observable(),

            activate: function () {
                this.categories(repository.getAll());
            }
        };
    });