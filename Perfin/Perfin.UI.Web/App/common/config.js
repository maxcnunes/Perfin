define(
    [],
    function () {
        var routes = [{
            url: 'welcome',
            moduleId: 'viewmodels/welcome',
            name: 'Welcome',
            visible: true,
            caption: '<i class="icon-book"></i> Welcome',
            settings: {
                classColor: 'green',
                classIcon : 'icon-home'
            }
        },
        //category
        {
            url: 'category/show',
            moduleId: 'viewmodels/category/show',
            name: 'Categories',
            visible: true,
            caption: '<i class="icon-book"></i> Categories',
            settings: {
                classColor: 'blue',
                classIcon: 'icon-tag'
            }
        }, {
            url: 'category/add',
            moduleId: 'viewmodels/category/add',
            name: 'Add Category',
            visible: false,
            caption: '<i class="icon-plus"></i> Add Category'
        }, {
            url: 'category/details/:id',
            moduleId: 'viewmodels/category/details',
            name: 'Edit Category',
            visible: false,
            caption: '<i class="icon-book"></i> Sessions'
        },
        //user
        {
            url: 'user/show',
            moduleId: 'viewmodels/user/show',
            name: 'Users',
            visible: false,
            caption: '<i class="icon-book"></i> Users',
            settings: {
                classColor: 'blue',
                classIcon: 'icon-tag'
            }
        }, {
            url: 'user/add',
            moduleId: 'viewmodels/user/add',
            name: 'Add User',
            visible: false,
            caption: '<i class="icon-plus"></i> Add User'
        }, {
            url: 'user/details/:id',
            moduleId: 'viewmodels/user/details',
            name: 'Edit User',
            visible: false,
            caption: '<i class="icon-book"></i> Sessions'
        },
        //
        {
            url: 'map/show',
            moduleId: 'viewmodels/map/show',
            name: 'Maps',
            visible: true,
            caption: '<i class="icon-book"></i> Maps',
            settings: {
                classColor: 'yellow',
                classIcon: 'icon-map-marker'
            }
        }, {
            url: 'calendar/show',
            moduleId: 'viewmodels/calendar/show',
            name: 'Calendar',
            visible: true,
            caption: '<i class="icon-book"></i> Calendar',
            settings: {
                classColor: 'purple',
                classIcon: 'icon-calendar'
            }
        }, {
            url: 'chart/show',
            moduleId: 'viewmodels/chart/show',
            name: 'Chart',
            visible: true,
            caption: '<i class="icon-book"></i> Chart',
            settings: {
                classColor: 'red',
                classIcon: 'icon-bar-chart'
            }
        }, {
            url: 'chart/show',
            moduleId: 'viewmodels/chart/show',
            name: 'Chart',
            visible: true,
            caption: '<i class="icon-book"></i> Chart',
            settings: {
                classColor: 'dark-gray',
                classIcon: 'icon-cogs'
            }
        }, { // :: EXAMPLE ::
            url: 'flickr',
            moduleId: 'viewmodels/flickr',
            name: 'Flickr',
            visible: true,
            caption: '<i class="icon-book"></i> Flickr',
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

        return {
            routes: routes,
            startModule: startModule,
            messages: messages
        };
    });