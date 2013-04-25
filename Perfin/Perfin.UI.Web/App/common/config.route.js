define(function () {
    var
        routes = {
            public: [],
            private: []
        },
        startModule = {
            public: 'welcome',
            private: 'user/login'
        },
        modulesId = {
            welcome: 'viewmodels/welcome',
            category: { show: 'viewmodels/category/show', add: 'viewmodels/category/add', details: 'viewmodels/category/details' },
            user: { show: 'viewmodels/user/show', add: 'viewmodels/user/add', details: 'viewmodels/user/details' },
            accountType: { show: 'viewmodels/accounttype/show', add: 'viewmodels/accounttype/add', details: 'viewmodels/accounttype/details' },
            account: { show: 'viewmodels/account/show', add: 'viewmodels/account/add', details: 'viewmodels/account/details' },
            map: { show: 'viewmodels/map/show' },
            calendar: { show: 'viewmodels/calendar/show' },
            chart: { show: 'viewmodels/chart/show' }
        },

        homeRoute = function () {
            return [{
                url: 'welcome',
                moduleId: modulesId.welcome,
                name: '<i class="icon-book"></i> Welcome',
                visible: true,
                caption: 'Home',
                settings: {
                    classColor: 'green',
                    classIcon: 'icon-home'
                }
            }];
        },

        categoryRoutes = function () {
            return [{
                url: 'category/show',
                moduleId: modulesId.category.show,
                name: '<i class="icon-book"></i> Categories',
                visible: true,
                caption: 'Categories',
                settings: {
                    classColor: 'blue',
                    classIcon: 'icon-tag',
                    parentModule: modulesId.welcome
                }
            }, {
                url: 'category/add',
                moduleId: modulesId.category.add,
                name: '<i class="icon-plus"></i> Add Category',
                visible: false,
                caption: 'Add Category',
                settings: { parentModule: modulesId.welcome }
            }, {
                url: 'category/details/:id',
                moduleId: modulesId.category.details,
                name: '<i class="icon-book"></i> Edit Category',
                visible: false,
                caption: 'Edit Category',
                settings: { parentModule: modulesId.welcome }
            }];
        },

        userRoutes = function () {
            return [{
                url: 'user/show',
                moduleId: modulesId.user.show,
                name: '<i class="icon-book"></i> Users',
                visible: false,
                caption: 'Users',
                settings: {
                    classColor: 'blue',
                    classIcon: 'icon-tag',
                    parentModule: modulesId.welcome
                }
            }, {
                url: 'user/add',
                moduleId: modulesId.user.add,
                name: '<i class="icon-plus"></i> Add User',
                visible: false,
                caption: 'Add User',
                settings: { parentModule: modulesId.welcome }
            }, {
                url: 'user/details/:id',
                moduleId: modulesId.user.details,
                name: '<i class="icon-book"></i> Edit User',
                visible: false,
                caption: 'Edit User',
                settings: { parentModule: modulesId.welcome }
            }];
        },

        accoutTypeRoutes = function () {
            return [{
                url: 'accounttype/show',
                moduleId: modulesId.accountType.show,
                name: '<i class="icon-book"></i> Account Types',
                visible: false,
                caption: 'Account Type',
                settings: {
                    classColor: 'red',
                    classIcon: 'icon-tag',
                    parentModule: modulesId.welcome
                }
            }, {
                url: 'accounttype/add',
                moduleId: modulesId.accountType.add,
                name: '<i class="icon-plus"></i> Add Account Type',
                visible: false,
                caption: 'Add Account Type',
                settings: { parentModule: modulesId.welcome }
            }, {
                url: 'accounttype/details/:id',
                moduleId: modulesId.accountType.details,
                name: '<i class="icon-book"></i> Edit Account Type',
                visible: false,
                caption: 'Edit Account Type',
                settings: { parentModule: modulesId.welcome }
            }];
        },

        accountRoutes = function () {
            return [{
                url: 'account/show',
                moduleId: modulesId.account.show,
                name: '<i class="icon-book"></i> Account',
                visible: false,
                caption: 'Account',
                settings: {
                    classColor: 'blue',
                    classIcon: 'icon-tag',
                    parentModule: modulesId.welcome
                }
            }, {
                url: 'account/add',
                moduleId: modulesId.account.add,
                name: '<i class="icon-plus"></i> Add Account',
                visible: false,
                caption: 'Add Account',
                settings: { parentModule: modulesId.welcome }
            }, {
                url: 'account/details/:id',
                moduleId: modulesId.account.details,
                name: '<i class="icon-book"></i> Edit Account',
                visible: false,
                caption: 'Edit Account',
                settings: { parentModule: modulesId.welcome }
            }];
        },

        mapRoute = function () {
            return [{
                url: 'map/show',
                moduleId: modulesId.map.show,
                name: '<i class="icon-book"></i> Maps',
                visible: true,
                caption: ' Maps',
                settings: {
                    classColor: 'yellow',
                    classIcon: 'icon-map-marker',
                    parentModule: modulesId.welcome
                }
            }];
        },

        calendarRoute = function () {
            return [{
                url: 'calendar/show',
                moduleId: modulesId.calendar.show,
                name: '<i class="icon-book"></i> Calendar',
                visible: true,
                caption: 'Calendar',
                settings: {
                    classColor: 'purple',
                    classIcon: 'icon-calendar',
                    parentModule: modulesId.welcome
                }
            }];
        },

        chartRoute = function () {
            return [{
                url: 'chart/show',
                moduleId: modulesId.chart.show,
                name: '<i class="icon-book"></i> Chart',
                visible: true,
                caption: 'Chart',
                settings: {
                    classColor: 'red',
                    classIcon: 'icon-bar-chart',
                    parentModule: modulesId.welcome
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
        startModule: startModule,
        modulesId: modulesId
    };
});