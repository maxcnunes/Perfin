define([
    'durandal/app',
    'durandal/plugins/router',
    'repositories/category'],
    function (app, router, repository) {
        return {
            categoryToAdd: {
                name: ko.observable(),
                parent: ko.observable()
            },

            activate: function () {
                this.categoryToAdd.name('');
                this.categoryToAdd.parent('');
                this._categoryAdded = false;
            },

            canDeactivate: function () {
                if (this._categoryAdded == false) {
                    return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
                } else {
                    return true;
                }
            },

            addCategory: function () {
                // Add item to db
                repository.addCategory(ko.toJS(this.categoryToAdd));

                // flag new item
                this._categoryAdded = true;

                // return to list of items
                router.navigateTo("#/category/show");
            }
        };
    });