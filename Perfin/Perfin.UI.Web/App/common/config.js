define(['ko', 'common/config.route'],
    function (ko, configRoute) {

        var messages = {
            changesPending: 'Please save or cancel your changes before leaving the page.',
            errorSavingData: 'Data could not be saved. Please check the logs.',
            errorGettingData: 'Could not retrieve data.  Please check the logs.',
            invalidRoute: 'Cannot navigate. Invalid route',
            retreivedData: 'Data retrieved successfully',
            savedData: 'Data saved successfully'
        };

        var validationInit = function () {
            ko.validation.configure({
                registerExtenders: true,    //default is true
                messagesOnModified: true,   //default is true
                insertMessages: true,       //default is true
                parseInputAttributes: true, //default is false
                writeInputAttributes: true, //default is false
                messageTemplate: null,      //default is null
                decorateElement: true       //default is false. Applies the .validationElement CSS class
            });
        };

        // Authentication 
        var authentication = {
            localTokenId: 'auth0TokenId',
            localAccessToken: 'auth0AccessToken',
            providerClientId: ''
        };

        var init = function () {
            //if (_useMocks) {
            //    dataserviceInit = mock.dataserviceInit;
            //}
            //dataserviceInit();

            //toastr.options.timeOut = toastrTimeout;
            //configureExternalTemplates();
            validationInit();
        };

        init();

        return {
            route: configRoute,
            messages: messages,
            authentication: authentication
        };
    });