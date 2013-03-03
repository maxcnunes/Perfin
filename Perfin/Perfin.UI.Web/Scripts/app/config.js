//All common configurations

define('config',
    ['toastr', 'ko'],
    function (toastr, ko) {
        
        // Private Members
        var
            // Properties
            //------------------------
            currentUserId = 1, // First User (just on development enviroment)
            currentUser = ko.observable(),
            // Links for the module pages
            hashes = {
                categories : '#/categories'
            },
            logger = toastr, // use toastr for the logger
            messages = {
                viewModelActivated: 'viewmodel-activation'
            },
            stateKeys = {
                lastView: 'state.activate-hash'
            },
            storeExpirationMs = (1000 * 60 * 60 * 24), // 1 day
            title = 'Perfin > ',
            toastrTimeout = 2000,

            // View Ids (Html Section Id)
            viewsIds = {
                shell: '#shell-view',
                categories: '#category-view'
            },

            toasts = {
                changesPending: 'Please save or cancel your changes before leaving the page.',
                errorSavingData: 'Data could not be saved. Please check the logs.',
                errorGettingData: 'Could not retrieve data.  Please check the logs.',
                invalidRoute: 'Cannot navigate. Invalid route',
                retreivedData: 'Data retrieved successfully',
                savedData: 'Data saved successfully'
            },


            // Methods
            //------------------------
            dataserviceInit = function () { },

            configureExternalTemplates = function () {
                infuser.defaults.templatePrefix = "_";
                infuser.defaults.templateSuffix = ".tmpl.html";
                infuser.defaults.templateUrl = "/Tmpl";
            },

            validationInit = function () {
                ko.validation.configure({
                    registerExtenders: true,    //default is true
                    messagesOnModified: true,   //default is true
                    insertMessages: true,       //default is true
                    parseInputAttributes: true, //default is false
                    writeInputAttributes: true, //default is false
                    messageTemplate: null,      //default is null
                    decorateElement: true       //default is false. Applies the .validationElement CSS class
                });
            },

            init = function () {
                dataserviceInit();

                toastr.options.timeOut = toastrTimeout;
                configureExternalTemplates();
                validationInit();
            };


        init();
        

        // Public Members
        return {
            currentUserId: currentUserId,
            currentUser: currentUser,
            dataserviceInit: dataserviceInit,
            hashes:hashes,
            logger: logger,
            messages: messages,
            stateKeys: stateKeys,
            storeExpirationMs: storeExpirationMs,
            title: title,
            viewsIds: viewsIds,
            toasts: toasts,
            window: window
        };
    }
);