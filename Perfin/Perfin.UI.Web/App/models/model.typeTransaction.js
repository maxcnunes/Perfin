define(
    ['ko'],
    function (ko) {
        var TypeTransaction = function (id, name) {
            var self = this;
            self.id = ko.observable(id);
            self.name = ko.observable(name);
            return self;
        };

        var expense = new TypeTransaction(0, 'Expense'),
            income = new TypeTransaction(1, 'Income');


        var
            typeTransactions = {
                expense: expense,
                income: income
            },
            getAll = function () {
                return [expense, income];
            },
            getNameById = function (typeTransactionId) {
                if (typeTransactionId === 0) return expense.name();
                if (typeTransactionId === 1) return income.name();
                return '';
            };

        return {
            typeTransactions: typeTransactions,
            getAll: getAll,
            getNameById: getNameById
        };
    });