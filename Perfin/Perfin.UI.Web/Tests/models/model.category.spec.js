define([
    'models/model.category'],
    function (model) {
        describe('Model :: Category', function () {

            var category = new model();

            it('should be defined as not dirty when initialized', function () {

                expect(category.dirtyFlag().isDirty()).toBe(false);
            });

            it('should be defined as dirty when any property changed', function () {

                category.id(99);
                category.name('name test');
                category.parent(99);

                expect(category.dirtyFlag().isDirty()).toBe(true);
            });
        });
    });