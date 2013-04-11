define(
    ['ko'],
    function (ko) {
        var AccountType = function () {

            var self = this;
            self.id = ko.observable();
            self.name = ko.observable().extend({ required: true });
            
            self.isNullo = false;
            self.dirtyFlag = new ko.DirtyFlag([self.id, self.name]);

            return self;
        };

        AccountType.Nullo = new AccountType().id(0).name('Not a AccountType');
        AccountType.Nullo.isNullo = true;
        AccountType.Nullo.dirtyFlag().reset();

        AccountType.datacontext = function (dc) {
            if (dc) { _dc = dc; }
            return _dc;
        }

        return AccountType;
    });