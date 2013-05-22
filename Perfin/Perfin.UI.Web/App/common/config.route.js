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
            entry: { show: 'viewmodels/entry/daily', add: 'viewmodels/entry/add', details: 'viewmodels/entry/details', daily: 'viewmodels/entry/daily' },
            map: { show: 'viewmodels/map/show' },
            calendar: { show: 'viewmodels/calendar/show' },
            chart: { show: 'viewmodels/chart/show' }
        },

        homeRoute = function () {
            return [{
                url: 'welcome',
                moduleId: modulesId.welcome,
                name: '<i class="icon-home"></i> Welcome',
                visible: false,
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
                name: '<i class="icon-tag"></i> Categories',
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
                name: '<i class="icon-user"></i> Users',
                visible: false,
                caption: 'Users',
                settings: {
                    classColor: 'blue',
                    classIcon: 'icon-user',
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

        entryRoutes = function () {
            return [{
                url: 'entry/daily',
                moduleId: modulesId.entry.show,
                name: '<i class="icon-money"></i> Entry',
                visible: true,
                caption: 'Entry',
                settings: {
                    classColor: 'blue',
                    classIcon: 'icon-money',
                    parentModule: modulesId.welcome
                }
            }, {
                url: 'entry/add',
                moduleId: modulesId.entry.add,
                name: '<i class="icon-plus"></i> Add Entry',
                visible: false,
                caption: 'Add Entry',
                settings: { parentModule: modulesId.welcome }
            }, {
                url: 'entry/details/:id',
                moduleId: modulesId.entry.details,
                name: '<i class="icon-book"></i> Edit Entry',
                visible: false,
                caption: 'Edit Entry',
                settings: { parentModule: modulesId.welcome }
            }, {
                url: 'entry/daily',
                moduleId: modulesId.entry.daily,
                name: '<i class="icon-book"></i> Daily Entries',
                visible: false,
                caption: 'Daily Entries',
                settings: { parentModule: modulesId.welcome }
            }];
        },

        mapRoute = function () {
            return [{
                url: 'map/show',
                moduleId: modulesId.map.show,
                name: '<i class="icon-map-marker"></i> Maps',
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
                name: '<i class="icon-calendar"></i> Calendar',
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
                name: '<i class="icon-bar-chart"></i> Chart',
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
                name: '<i class="icon-lock"></i> Login',
                visible: true,
                caption: 'Login'
            }, {
                url: 'user/register',
                moduleId: 'viewmodels/user/register',
                name: '<i class="icon-lock"></i> Register',
                visible: true,
                caption: 'Register'
            }];
        },

        /*
         * Build routes 
         */
        buildPrivateRoutes = function () {
            routes.private = [];
            routes.private.appendRoutes(homeRoute());
            routes.private.appendRoutes(categoryRoutes());
            routes.private.appendRoutes(entryRoutes());
            routes.private.appendRoutes(mapRoute());
            routes.private.appendRoutes(calendarRoute());
            routes.private.appendRoutes(chartRoute());
        },
        buildPublicRoutes = function () {
            routes.public = [];
            routes.public.appendRoutes(userPublicRoutes());
        };

    Array.prototype.appendRoutes = function (routesToAppend) {
        if (!routesToAppend) return;
        for (var i = 0; i < routesToAppend.length; i++) this.push(routesToAppend[i]);
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