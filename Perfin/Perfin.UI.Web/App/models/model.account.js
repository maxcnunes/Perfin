define(
    ['ko'],
    function (ko) {
        var Account = function () {

            var self = this;
            self.id = ko.observable();
            self.name = ko.observable();
            self.description = ko.observable();
            self.accounttypeId = ko.observable();
            self.categoryId = ko.observable();

            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([self.id, self.name, self.description]);

            return self;
        };

        Account.Nullo = new Account().id(0).name('Not a Account');// .AccountType(null).Category(null);
        Account.Nullo.isNullo = true;
        Account.Nullo.dirtyFlag().reset();

        Account.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        }

        // Prototype is available to all instances.
        // It has access to the properties of the instance of Session.
        Account.prototype = function () {
            var
                dc = Account.datacontext,
                
                accounttype = function () {
                    return dc().accounttype.getLocalById(this.accounttypeId());
                },

                category = function () {
                    return dc().category.getLocalById(this.categoryId());
                };

            return {
                isNullo: false,
                accounttype: accounttype,
                category: category
            };
        }();

        return Account;
    });