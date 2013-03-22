define(
    ['ko'],
    function (ko) {
        var Category = function () {

            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.parent = ko.observable();
            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([self.id, self.name, self.parent]);

            return self;
        };

        Category.Nullo = new Category().id(0).name('Not a Category').parent(0);
        Category.Nullo.isNullo = true;
        Category.Nullo.dirtyFlag().reset();

        Category.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        }

        return Category;
    });