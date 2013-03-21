define([
    'repositories/category'],
    function (repository) {
        describe('Repository :: Category', function () {
            it('should add new category', function () {

                var categoryToAdd = { id: 99, name: "Category Test", parent: "" };

                repository.addCategory(categoryToAdd);

                var categoryAdded = repository.getCategory(categoryToAdd.id);

                expect(categoryAdded.name).toEqual(categoryToAdd.name);
            });
        });
    });