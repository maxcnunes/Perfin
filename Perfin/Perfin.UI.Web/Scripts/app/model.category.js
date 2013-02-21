define('model.category',
    ['ko'],
    function (ko) {
        var Category = function () {

            var self = {
                id: ko.observable(),
                name: ko.observable(),
                isNullo: false
            };

            return self;
        };

        Category.Nullo = new Category().id(0).name('Not a Category');
        Category.Nullo.isNullo = true;

        return Category;
    });