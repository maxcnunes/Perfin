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

            viewsIds = {
                shell: '#shell-view',
                categories: '#categories-view'
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

            init = function () {
                dataserviceInit();
            };



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