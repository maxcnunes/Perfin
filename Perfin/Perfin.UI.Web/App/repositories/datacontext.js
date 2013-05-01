define([
    'models/model',
    'repositories/repository.category',
    'repositories/repository.user',
    'repositories/repository.entry',
    'repositories/repository.assets'],
    function (model, categoryRepository, userRepository, entryRepository, assetsRepository) {

        var datacontext = {
            category: categoryRepository,
            user: userRepository,
            entry: entryRepository,
            assets: assetsRepository
        };

        // We did this so we can access the datacontext during its construction
        model.setDataContext(datacontext);

        return datacontext;
    }
);