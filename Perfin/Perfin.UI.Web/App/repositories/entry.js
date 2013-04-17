define(
    [],
    function () {
        return {
            _lastId: 3,
            _entries: [
                { id: 1, price: 1, registrydate: "2013-01-01", paymentdate: "2013-01-01", accountId: 1, userId: 1 },
                { id: 1, price: 5, registrydate: "2013-01-01", paymentdate: "2013-01-01", accountId: 1, userId: 1 },
                { id: 1, price: 2, registrydate: "2013-01-01", paymentdate: "2013-01-01", accountId: 1, userId: 1 }
            ],

            getAll: function () {
                return this._entries;
            },

            addEntry: function (entryToAdd) {
                entryToAdd.id = ++this._lastId;
                this._entries.push(entryToAdd);
            },

            getEntry: function (id) {
                for (var i = 0; i < this._entries.length; i++) {
                    if (this._entries[i].id == id) {
                        return this._entries[i];
                        break;
                    }
                }
            }
        };
    }
);