define(
    ['ko', 'moment'],
    function (ko, moment) {
        var Entry = function () {

            var self = this;
            self.id = ko.observable();
            self.price = ko.observable().extend({ required: true });
            self.description = ko.observable();
            self.registryDate = ko.observable();
            self.paymentDate = ko.observable(null); 
            self.accountId = ko.observable().extend({ required: true });

            self.userId = ko.observable();

            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([self.id, self.price, self.description, self.registryDate, self.paymentDate, self.accountId, self.userId]);      

            return self;
        };

        Entry.Nullo = new Entry().id(0).price(0);// .EntryType(null).Category(null);  todo  object = null or id = 0?
        Entry.Nullo.isNullo = true;
        Entry.Nullo.dirtyFlag().reset();


        var _dc = null;
        Entry.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        }

        // Prototype is available to all instances.
        // It has access to the properties of the instance of Session.
        Entry.prototype = function () {
            var
                dc = Entry.datacontext,
                
                account = function () {
                    return dc().account.getLocalById(this.accountId());
                },

                user = function () {
                    return dc().user.getLocalById(this.userId());
                };
            return {
                isNullo: false,
                account: account,
                user: user
            };
        }();

        return Entry;
    });