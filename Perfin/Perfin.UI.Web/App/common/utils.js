
define([], function () {

    var
        hasProperties = function (obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return true;
                }
            }
            return false;
        },
        invokeFunctionIfExists = function (callback) {
            if (_.isFunction(callback)) {
                callback();
            }
        },
        mapMemoToArray = function (items) {
            var underlyingArray = [];
            for (var prop in items) {
                if (items.hasOwnProperty(prop)) {
                    underlyingArray.push(items[prop]);
                }
            }
            return underlyingArray;
        },
        formatCurrency = function (value) {
            return $('<span />').text(value).currency().text();
        },
        createBackupAllProperties = function (self) {
            for (key in self) {
                if (ko.isObservable(self[key]) && typeof self[key].backupEnabled == 'function') {
                    if (!self['bkp']) {
                        self.bkp = {};
                    }
                    self.bkp[key] = self[key]();
                }
            }
        },
        resetAllProperties = function (self) {
            for (key in self) {
                if (ko.isObservable(self[key]) && typeof self[key].backupEnabled == 'function' && self.bkp) {
                    self[key](self.bkp[key]);
                }
            }
        },
        koModelBackup = function (model) {
            return {
                create: function () {
                    createBackupAllProperties(model);
                },
                restore: function () {
                    resetAllProperties(model);
                }
            };
        };

    // Public Members
    return {
        hasProperties: hasProperties,
        invokeFunctionIfExists: invokeFunctionIfExists,
        mapMemoToArray: mapMemoToArray,
        formatCurrency: formatCurrency,
        koModelBackup: koModelBackup
    };
});