define('model.category',
    ['ko'],
    function (ko) {
        var Category = function () {

            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([self.name]);

            return self;
        };

        Category.Nullo = new Category().id(0).name('Not a Category');
        Category.Nullo.isNullo = true;
        Category.Nullo.dirtyFlag().reset();

        Category.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        }

        return Category;
    });