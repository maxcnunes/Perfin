define([
    'durandal/app',
    'services/datacontext',
    'durandal/plugins/router',
    'models/model.category'],
    function (app, datacontext, router, model) {


        var
            isSaving = ko.observable(false),
            parentCategories = ko.observableArray(),
            category = ko.observable(),

            activate = function () {
                initLookups();
                category(new model());
                //category(datacontext.createSession());
            },
            initLookups = function () {
                //parentCategories(datacontext.lookups.rooms);
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditCategory = ko.computed(function () {
                return category();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                if (canEditCategory()) {
                    return category().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
            }),
            canSave = ko.computed(function () {
                return hasChanges() && !isSaving();
            }),

            save = function () {

                // OLD
                //----------------------------
                //// Add item to db
                //repository.addCategory(ko.toJS(this.categoryToAdd));

                //// flag new item
                //this._categoryAdded = true;

                //// return to list of items
                //router.navigateTo("#/category/show");


                // NEW EXAMPLE
                //----------------------------
                //isSaving(true);
                //datacontext.saveChanges()
                //    .then(goToEditView).fin(complete);

                //function goToEditView(result) {
                //    router.replaceLocation('#/sessiondetail/' + session().id());
                //}

                //function complete() {
                //    isSaving(false);
                //}
            },
            canDeactivate = function () {
                return true;

                // OLD
                //----------------------------
                //if (this._categoryAdded == false) {
                //    return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
                //} else {
                //    return true;
                //}


                // NEW EXAMPLE
                //----------------------------
                //if (hasChanges()) {
                //    var msg = 'Do you want to leave and cancel?';
                //    return app.showMessage(msg, 'Navigate Away', ['Yes', 'No'])
                //        .then(function (selectedOption) {
                //            if (selectedOption === 'Yes') {
                //                datacontext.cancelChanges();
                //            }
                //            return selectedOption;
                //        });
                //}
                //return true;
            };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            parentCategories: parentCategories,
            save: save,
            category: category,

            // module page info
            pageDisplayName: 'Create Category',
            pageDescription: 'Create a category and let more organized your finances'
        };

        return vm;
    });