define(['common/config', 'underscore'],
    function (config, _) {
        var
            allRoutes = config.route.routes.private,
            breadCrumbNav = [],
            iconClass = {
                home: 'icon-home icon-large',
                separator: 'icon-double-angle-right icon-large'
            },

            buildBreadCrumb = function (currentModuleId) {
                // clean previous breadcrumb
                breadCrumbNav = [];

                var currentModule = getCurrentModule(currentModuleId);
                breadCrumbNav.unshift(new BreadCrumbItem(currentModule.caption, currentModule.url, iconClass.separator, true));

                var parentModule = getParentModule(currentModule);
                while (parentModule) {
                    var module = new BreadCrumbItem(parentModule.caption, parentModule.url, iconClass.separator);

                    // Get the next
                    parentModule = getParentModule(parentModule);
                    if (!parentModule)
                        module.iconClass = iconClass.home;

                    breadCrumbNav.unshift(module);
                }
                return breadCrumbNav;
            },
            getCurrentModule = function (currentModuleId) {
                return _.find(allRoutes, function (route) { return route.moduleId == currentModuleId });
            }
            getParentModule = function (module) {
                if(!module || !module.settings || !module.settings.parentModule)
                    return;

                return _.find(allRoutes, function (route) { return route.moduleId == module.settings.parentModule });
            };


        var BreadCrumbItem = function (lable, url, iconClass, isCurrentModule) {

            var self = this;
            self.lable = lable;
            self.url = url;
            self.iconClass = iconClass;
            self.current = isCurrentModule ? 'current' : '';

            return self;
        };

        return {
            buildBreadCrumb: buildBreadCrumb
        };
    }
);