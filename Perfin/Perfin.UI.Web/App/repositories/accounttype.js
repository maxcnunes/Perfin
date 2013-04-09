define(
    [],
    function () {
        return {
            _lastId: 3,
            _accounttypes: [
                { id: 1, name: "Receita"},
                { id: 2, name: "Despesa"}
            ],

            getAll: function () {
                return this._accounttypes;
            },

            addAccountType: function (accounttypeToAdd) {
                accounttypeToAdd.id = ++this._lastId;
                this._accounttypes.push(accounttypeToAdd);
            },

            getAccountType: function (id) {
                for (var i = 0; i < this._accounttypes.length; i++) {
                    if (this._accounttypes[i].id == id) {
                        return this._accounttypes[i];
                        break;
                    }
                }
            }
        };
    }
);