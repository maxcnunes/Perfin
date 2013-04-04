define(
    [],
    function () {
        return {
            _lastId: 1,
            _users: [
                { id: 1, login: "admin", password: "admin", name:"adminname", email:"admin@email.com", salt:"salt" }
            ],

            getAll: function () {
                return this._users;
            },

            addUser: function (userToAdd) {
                userToAdd.id = ++this._lastId;
                this._users.push(userToAdd);
            },

            getUser: function (id) {
                for (var i = 0; i < this._users.length; i++) {
                    if (this._users[i].id == id) {
                        return this._users[i];
                        break;
                    }
                }
            }
        };
    }
);