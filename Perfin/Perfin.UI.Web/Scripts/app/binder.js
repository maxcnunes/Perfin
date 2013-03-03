define('binder',
    ['jquery', 'ko', 'config', 'vm'],
    function ($, ko, config, vm) {
        
        // Private Mermbers
        var
            ids = config.viewsIds,

            getView = function (viewName) {
                if ($(viewName).size() <= 0)
                    throw Error('Not found view by id: ' + viewName);
                
                return $(viewName).get(0);
            },

            // All binds
            bind = function () {
                ko.applyBindings(vm.shell, getView(ids.shell));
                ko.applyBindings(vm.category, getView(ids.categories));
            };

        // Public Members
        return {
            bind: bind
        };
    }
);