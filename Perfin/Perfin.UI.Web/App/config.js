define(
    [],
    function () {
        var routes = [{
            url: 'welcome',
            moduleId: 'viewmodels/welcome',
            name: 'Welcome',
            visible: true,
            caption: '<i class="icon-book"></i> Welcome'
        }, {
            url: 'flickr',
            moduleId: 'viewmodels/flickr',
            name: 'Flickr',
            visible: true,
            caption: '<i class="icon-book"></i> Flickr'
        }, {
            url: 'category/show',
            moduleId: 'viewmodels/category/show',
            name: 'Categories',
            visible: true,
            caption: '<i class="icon-book"></i> Categories'
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
        }];

        var startModule = 'welcome';

        return {
            routes: routes,
            startModule: startModule
        };
    });