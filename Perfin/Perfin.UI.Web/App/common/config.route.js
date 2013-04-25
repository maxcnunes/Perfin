define(function () {
    var
        routes = {
            public: [],
            private: []
        },
        startModule = {
            public : 'welcome',
            private : 'user/login'
        },

        homeRoute = function () {
            return [{
                url: 'welcome',
                moduleId: 'viewmodels/welcome',
                name: '<i class="icon-book"></i> Welcome',
                visible: true,
                caption: 'Welcome',
                settings: {
                    classColor: 'green',
                    classIcon: 'icon-home'
                }
            }];
        },

        categoryRoutes = function () {
            return [{
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
            }];
        },

        userRoutes = function () {
            return [{
                url: 'user/show',
                moduleId: 'viewmodels/user/show',
                name: '<i class="icon-book"></i> Users',
                visible: false,
                caption: 'Users',
                settings: {
                    classColor: 'blue',
                    classIcon: 'icon-tag'
                }
            }, {
                url: 'user/add',
                moduleId: 'viewmodels/user/add',
                name: '<i class="icon-plus"></i> Add User',
                visible: false,
                caption: 'Add User'
            }, {
                url: 'user/details/:id',
                moduleId: 'viewmodels/user/details',
                name: '<i class="icon-book"></i> Edit User',
                visible: false,
                caption: 'Sessions'
            }];
        },

        accoutTypeRoutes = function () {
            return [{
                url: 'accounttype/show',
                moduleId: 'viewmodels/accounttype/show',
                name: '<i class="icon-book"></i> Account Types',
                visible: false,
                caption: 'Account Type',
                settings: {
                    classColor: 'red',
                    classIcon: 'icon-tag'
                }
            }, {
                url: 'accounttype/add',
                moduleId: 'viewmodels/accounttype/add',
                name: '<i class="icon-plus"></i> Add Account Type',
                visible: false,
                caption: 'Add Account Type'
            }, {
                url: 'accounttype/details/:id',
                moduleId: 'viewmodels/accounttype/details',
                name: '<i class="icon-book"></i> Edit Account Type',
                visible: false,
                caption: 'Sessions'
            }];
        },

        accountRoutes = function () {
            return [{
                url: 'account/show',
                moduleId: 'viewmodels/account/show',
                name: '<i class="icon-book"></i> Account',
                visible: false,
                caption: 'Account',
                settings: {
                    classColor: 'blue',
                    classIcon: 'icon-tag'
                }
            }, {
                url: 'account/add',
                moduleId: 'viewmodels/account/add',
                name: '<i class="icon-plus"></i> Add Account',
                visible: false,
                caption: 'Add Account'
            }, {
                url: 'account/details/:id',
                moduleId: 'viewmodels/account/details',
                name: '<i class="icon-book"></i> Edit Account',
                visible: false,
                caption: 'Edit Account'
            }];
        },

        mapRoute = function () {
            return [{
                url: 'map/show',
                moduleId: 'viewmodels/map/show',
                name: '<i class="icon-book"></i> Maps',
                visible: true,
                caption: ' Maps',
                settings: {
                    classColor: 'yellow',
                    classIcon: 'icon-map-marker'
                }
            }];
        },

        calendarRoute = function () {
            return [{
                url: 'calendar/show',
                moduleId: 'viewmodels/calendar/show',
                name: '<i class="icon-book"></i> Calendar',
                visible: true,
                caption: 'Calendar',
                settings: {
                    classColor: 'purple',
                    classIcon: 'icon-calendar'
                }
            }];
        },

        chartRoute = function () {
            return [{
                url: 'chart/show',
                moduleId: 'viewmodels/chart/show',
                name: '<i class="icon-book"></i> Chart',
                visible: true,
                caption: 'Chart',
                settings: {
                    classColor: 'red',
                    classIcon: 'icon-bar-chart'
                }
            }];
        },

        userPublicRoutes = function () {
            return [{
                url: 'user/login',
                moduleId: 'viewmodels/user/login',
                name: '<i class="icon-book"></i> Login',
                visible: true,
                caption: 'Login'
            }, {
                url: 'user/register',
                moduleId: 'viewmodels/user/register',
                name: '<i class="icon-book"></i> Register',
                visible: true,
                caption: 'Register'
            }];
        },

        /*
         * Build routes 
         */
        buildPrivateRoutes = function () {
            routes.private = [];
            routes.private.pushArray(homeRoute());
            routes.private.pushArray(categoryRoutes());
            routes.private.pushArray(accoutTypeRoutes());
            routes.private.pushArray(accountRoutes());
            routes.private.pushArray(mapRoute());
            routes.private.pushArray(calendarRoute());
            routes.private.pushArray(chartRoute());
        },
        buildPublicRoutes = function () {
            routes.public = [];
            routes.public.pushArray(userPublicRoutes());
        },
        
        pushRoutes = function () {
            
        };

    Array.prototype.pushArray = function (arr) {
        this.push.apply(this, arr);
    };

    var init = function () {
        buildPrivateRoutes();
        buildPublicRoutes();
    };

    init();

    return {
        routes: routes,
        startModule: startModule
    };
});