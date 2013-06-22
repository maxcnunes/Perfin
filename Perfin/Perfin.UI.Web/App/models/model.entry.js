define(['ko', 'models/model.typeTransaction'],
    function (ko, typeTrans) {
        var Entry = function () {

            var self = this;
            self.id = ko.observable();
            self.amount = ko.observable().extend({ required: true });
            self.description = ko.observable();
            self.createDate = ko.observable();
            self.entryDate = ko.observable(null);
            self.categoryId = ko.observable(null);
            self.typeTransaction = ko.observable().extend({ required: true });

            self.userId = ko.observable();

            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([
                self.id, self.amount, self.description,
                self.createDate, self.entryDate,
                self.categoryId, self.userId,
                self.typeTransaction
            ]);

            self.typeTransactionName = ko.computed(function () {
                return typeTrans.getNameById(self.typeTransaction());
            });

            return self;
        };

        Entry.Nullo = new Entry().id(0).amount(0);
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

                category = function () {
                    return dc().category.getLocalById(this.categoryId());
                },

                user = function () {
                    return dc().user.getLocalById(this.userId());
                };
            return {
                isNullo: false,
                category: category,
                user: user
            };
        }();

        return Entry;
    });