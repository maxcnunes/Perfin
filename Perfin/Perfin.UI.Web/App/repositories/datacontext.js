define([
    'models/model',
    'repositories/repository.category',
    'repositories/repository.user',
    'repositories/repository.accounttype',
    'repositories/repository.account',
    'repositories/repository.entry',
    'repositories/repository.assets'],
    function (model, categoryRepository, userRepository, accounttypeRepository, accountRepository, entryRepository, assetsRepository) {

        var datacontext = {
            category: categoryRepository,
            user: userRepository,
            accounttype: accounttypeRepository,
            account: accountRepository,
            entry: entryRepository,
            assets: assetsRepository
        };

        // We did this so we can access the datacontext during its construction
        model.setDataContext(datacontext);

        return datacontext;
    }
);