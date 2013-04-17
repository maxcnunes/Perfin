define(
    ['ko'],
    function (ko) {
        var routes = [{
            url: 'welcome',
            moduleId: 'viewmodels/welcome',
            name: '<i class="icon-book"></i> Welcome',
            visible: true,
            caption: 'Welcome',
            settings: {
                classColor: 'green',
                classIcon : 'icon-home'
            }
        },
        //category
        {
            url: 'category/show',
            moduleId: 'viewmodels/category/show',
            name: '<i class="icon-book"></i> Categories',
            visible: true,
            caption: 'Categories',
            settings: {
                classColor: 'blue',
                classIcon: 'icon-tag'
            }
        }, {
            url: 'category/add',
            moduleId: 'viewmodels/category/add',
            name: '<i class="icon-plus"></i> Add Category',
            visible: false,
            caption: 'Add Category'
        }, {
            url: 'category/details/:id',
            moduleId: 'viewmodels/category/details',
            name: '<i class="icon-book"></i> Edit Category',
            visible: false,
            caption: 'Sessions'
        },
        //user
        {
            url: 'user/show',
            moduleId: 'viewmodels/user/show',
            name: '<i class="icon-book"></i> Users',
            visible: false,
            caption: 'Users',
            settings: {
                classColor: 'blue',
                classIcon: 'icon-tag'
            }
        },
        {
            url: 'user/add',
            moduleId: 'viewmodels/user/add',
            name: '<i class="icon-plus"></i> Add User',
            visible: false,
            caption: 'Add User'
        },
        {
            url: 'user/details/:id',
            moduleId: 'viewmodels/user/details',
            name: '<i class="icon-book"></i> Edit User',
            visible: false,
            caption: 'Sessions'
        },

         //accountType
        {
            url: 'accounttype/show',
            moduleId: 'viewmodels/accounttype/show',
            name: '<i class="icon-book"></i> Account Types',
            visible: false,
            caption: 'Account Type',
            settings: {
                classColor: 'red',
                classIcon: 'icon-tag'
            }
        },
        {
            url: 'accounttype/add',
            moduleId: 'viewmodels/accounttype/add',
            name: '<i class="icon-plus"></i> Add Account Type',
            visible: false,
            caption: 'Add Account Type'
        },
        {
            url: 'accounttype/details/:id',
            moduleId: 'viewmodels/accounttype/details',
            name: '<i class="icon-book"></i> Edit Account Type',
            visible: false,
            caption: 'Sessions'
        },

        //Account
        {
            url: 'account/show',
            moduleId: 'viewmodels/account/show',
            name: '<i class="icon-book"></i> Account',
            visible: false,
            caption: 'Account',
            settings: {
                classColor: 'blue',
                classIcon: 'icon-tag'
            }
        },
        {
            url: 'account/add',
            moduleId: 'viewmodels/account/add',
            name: '<i class="icon-plus"></i> Add Account',
            visible: false,
            caption: 'Add Account'
        },
        {
            url: 'account/details/:id',
            moduleId: 'viewmodels/account/details',
            name: '<i class="icon-book"></i> Edit Account',
            visible: false,
            caption: 'Edit Account'
        },

        //Map
        {
            url: 'map/show',
            moduleId: 'viewmodels/map/show',
            name: '<i class="icon-book"></i> Maps',
            visible: true,
            caption: ' Maps',
            settings: {
                classColor: 'yellow',
                classIcon: 'icon-map-marker'
            }
        }, {
            url: 'calendar/show',
            moduleId: 'viewmodels/calendar/show',
            name: '<i class="icon-book"></i> Calendar',
            visible: true,
            caption: 'Calendar',
            settings: {
                classColor: 'purple',
                classIcon: 'icon-calendar'
            }
        }, {
            url: 'chart/show',
            moduleId: 'viewmodels/chart/show',
            name: '<i class="icon-book"></i> Chart',
            visible: true,
            caption: 'Chart',
            settings: {
                classColor: 'red',
                classIcon: 'icon-bar-chart'
            }
        }, {
            url: 'chart/show',
            moduleId: 'viewmodels/chart/show',
            name: '<i class="icon-book"></i> Chart',
            visible: true,
            caption: 'Chart',
            settings: {
                classColor: 'dark-gray',
                classIcon: 'icon-cogs'
            }
        }, { // :: EXAMPLE ::
            url: 'flickr',
            moduleId: 'viewmodels/flickr',
            name: '<i class="icon-book"></i> Flickr',
            visible: true,
            caption: 'Flickr',
            settings: {
                classColor: 'green',
                classIcon : 'icon-home'
            }
        }];

        var startModule = 'welcome';

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
            routes: routes,
            startModule: startModule,
            messages: messages
        };
    });