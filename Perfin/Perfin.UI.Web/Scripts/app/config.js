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
            logger = toastr, // use toastr for the logger
            messages = {
                viewModelActivated: 'viewmodel-activation'
            },
            stateKeys = {
                lastView: 'state.activate-hash'
            },
            storeExpirationMs = (1000 * 60 * 60 * 24), // 1 day
            title = 'Perfin > ',
            toasts = {
                changesPending: 'Please save or cancel your changes before leaving the page.'
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
            logger: logger,
            messages: messages,
            stateKeys: stateKeys,
            storeExpirationMs: storeExpirationMs,
            title: title,
            toasts: toasts,
            window: window
        };
    }
);