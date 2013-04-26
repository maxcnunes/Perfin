define([
    'durandal/app',
    'jquery',
    'repositories/datacontext',
    'durandal/plugins/router',
    'models/model.entry',
    'models/model.account',
    'models/model.user',
    'common/breadcrumb',
    'common/config'],
    function (app, $, datacontext, router, model, accountModel, userModel, breadcrumb, config) {
        debugger;
        var
            self = this,
            isSaving = ko.observable(false),
            entry = ko.observable(),
            accounts = ko.observable(),
            selectedAccount = ko.observable(),
            validationErrors = ko.observableArray([]),


            activate = function () {
                debugger;
                initLookups();
                initAccountsSelect();
                
                entry(new model());
                entry().registrydate('01-01-2013'); //set manually for while TODO: get current date.
                validationErrors = ko.validation.group(entry());//apply validation
            },
            initLookups = function () {
                $.when(getAllAccounts());

                function getAllAccounts() {
                    return $.Deferred(function (def) {
                        $.when(datacontext.account.getData({ results: accounts }))
                            .fail(function () { def.reject(); })
                            .done(function () { def.resolve(); });
                    }).promise();
                }
            },
            initAccountsSelect = function () {
                selectedAccount(new accountModel());
                setTimeout(function () {
                    $('#ddl_accounts').chosen();
                    bindAccountsChangeEvent();
                }, 500);
            },
            bindAccountsChangeEvent = function () {
                /*
                 * This should be changed to Bind Handler later
                 */
                $(document).on("change", '#ddl_accounts', function () {
                    var id = $(this).find(':selected').val();
                    var _selectedAccount = datacontext.account.getLocalById(id);
                    selectedAccount(_selectedAccount);

                    //set the accountId (model property)
                    entry().accountId(id);

                });
            },
            cancel = function (complete) {
                router.navigateBack();
            },
            canEditEntry = ko.computed(function () {
                return entry();// && config.currentUser() && config.currentUser().id() === session().speakerId();
            }),
            hasChanges = ko.computed(function () {
                debugger;
                if (canEditEntry()) {
                     return entry().dirtyFlag().isDirty();
                }

                return false;
                //return datacontext.hasChanges();
            }),
            isValid = function () {
               return canEditEntry() ? validationErrors().length === 0 : true;
           },
            canSave = ko.computed(function () {
                debugger;
                return hasChanges() && !isSaving() && isValid();
            }),
            save = function () {

                isSaving(true);
                if (canEditEntry()) {
                    $.when(datacontext.entry.addData(entry()))
                        .then(goToEditView)
                        .done(complete); //.fin(complete);
                }

                function goToEditView(result) {
                    // redirect to index page while the edit page is not finished
                    router.replaceLocation('#/entry/show');
                }

                function complete() {
                    isSaving(false);
                }
            },
            canDeactivate = function () {
                return true;
            },
            goBack = function () {
                 router.navigateBack();
            };

        var vm = {
            activate: activate,
            canDeactivate: canDeactivate,
            canSave: canSave,
            cancel: cancel,
            hasChanges: hasChanges,
            save: save,
            goBack: goBack,
            entry: entry,
            accounts: accounts,
            selectedAccount: selectedAccount,


            // module page info
            pageDisplayName: 'Create an Entry',
            pageDescription: 'Create an entry and let more organized your finances',
            breadcrumbNav: breadcrumb.buildBreadCrumb(config.route.modulesId.entry.add)
        };

        return vm;
    });