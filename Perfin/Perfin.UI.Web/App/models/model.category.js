define(
    ['ko'],
    function (ko) {
        var Category = function () {

            var self = this;
            self.id = ko.observable();
            self.name = ko.observable().extend({ required: true });
            self.parentCategoryId = ko.observable();
            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([self.id, self.name, self.parentCategoryId]);

            return self;
        };

        Category.Nullo = new Category().id(0).name('---').parentCategoryId(0);
        Category.Nullo.isNullo = true;
        Category.Nullo.dirtyFlag().reset();

        var _dc = null;
        Category.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        };

        // Prototype is available to all instances.
        // It has access to the properties of the instance of Category.
        Category.prototype = function () {
            var
                dc = Category.datacontext,
                parentCategory = function () {
                    return dc().category.getLocalById(this.parentCategoryId());
                };

            return {
                isNullo: false,
                parentCategory: parentCategory
            };
        }();

        return Category;
    });