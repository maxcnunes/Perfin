define(
    [],
    function () {
        return {
            _lastId: 3,
            _accounts: [
                { id: 1, name: "Luz", accounttypeId: 1, categoryId: 1},
                { id: 2, name: "Gas", accounttypeId: 1, categoryId: 1 },
                { id: 3, name: "Comida", accounttypeId: 1, categoryId: 1 }
            ],

            getAll: function () {
                return this._accounts;
            },

            addAccount: function (accountToAdd) {
                accountToAdd.id = ++this._lastId;
                this._accounts.push(accountToAdd);
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