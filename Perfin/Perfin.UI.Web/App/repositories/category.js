define(
    [],
    function () {
        return {
            _lastId: 3,
            _categories: [
                { id: 1, name: "Feed", parent: "" },
                { id: 2, name: "Transport", parent: "" },
                { id: 3, name: "Study", parent: "" },
            ],

            getAll: function () {
                return this._categories;
            },

            addCategory: function (categoryToAdd) {
                categoryToAdd.id = ++this._lastId;
                this._categories.push(categoryToAdd);
            },

            getCategory: function (id) {
                for (var i = 0; i < this._categories.length; i++) {
                    if (this._categories[i].id == id) {
                        return this._categories[i];
                        break;
                    }
                }
            }
        };
    }
);