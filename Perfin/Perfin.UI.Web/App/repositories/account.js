define(
    [],
    function () {
        return {
            _lastId: 3,
            _accounts: [
                { id: 1, name: "Luz", Category : new Category(), AccountType : new AccountType()},
                { id: 2, name: "Gas", Category: new Category(), AccountType: new AccountType() },
                { id: 3, name: "Comida", Category: new Category(), AccountType: new AccountType() },
            ],

            getAll: function () {
                return this._accounts;
            },

            addAccount: function (categoryToAdd) {
                categoryToAdd.id = ++this._lastId;
                this._accounts.push(categoryToAdd);
            },

            getAccount: function (id) {
                for (var i = 0; i < this._accounts.length; i++) {
                    if (this._accounts[i].id == id) {
                        return this._accounts[i];
                        break;
                    }
                }
            }
        };
    }
);