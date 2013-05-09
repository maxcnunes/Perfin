define(['ko', 'models/model.typeTransaction', 'common/utils'],
    function (ko, typeTrans, utils) {
        var Entry = function () {

            var self = this;
            self.id = ko.observable();
            self.amount = ko.observable().extend({ required: true, backupEnabled: true });
            self.description = ko.observable().extend({ backupEnabled: true });
            self.createDate = ko.observable().extend({ backupEnabled: true });
            self.entryDate = ko.observable(null).extend({ backupEnabled: true });
            self.categoryId = ko.observable(null).extend({ backupEnabled: true });
            self.typeTransaction = ko.observable().extend({ required: true, backupEnabled: true });

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
                },

                // add support to restore previous model values
                backup = function () {
                    return utils.koModelBackup(this);
                };
            return {
                isNullo: false,
                category: category,
                user: user,
                backup: backup
            };
        }();

        return Entry;
    });