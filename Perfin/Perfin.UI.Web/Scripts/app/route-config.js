define('route-config',
    ['config', 'router', 'vm'],
    function (config, router, vm) {

        // Private Members
        var
            logger = config.logger,

            register = function () {

                var routeData = [

                    // Categories routes
                    {
                        view: config.viewsIds.categories,
                        routes: [
                            {
                                isDefault: true,
                                route: config.hashes.categories,
                                title: 'Categories',
                                callback: vm.category.activate,
                                group: '.route-left'
                            }
                        ]
                    },

                    // Invalid routes
                    {
                        view: '',
                        route: /.*/,
                        title: '',
                        callback: function () {
                            logger.error(config.toasts.invalidRoute);
                        }
                    }
                ];

                for (var i = 0; i < routeData.length; i++) {
                    router.register(routeData[i]);
                }

                // Crank up the router
                router.run();
            };

        // Public Members
        return {
            register: register
        };
    }
);