(function () {
    // Config base js App path
    require.config({
        baseUrl: '/App/',
        paths: {
            jquery: 'lib/jquery-1.8.0',
            //underscore: 'lib/underscore-1.3.3',
            //jasmine: '../test/lib/jasmine',
            //'jasmine-html': '../test/lib/jasmine-html',

            //'jasmine-require': '../test/lib/jasmine-require', // ADDED!

            spec: '../tests/'
        },
    });

    var baseTestPath = '../tests/';

    // Establish the root object, 'window' in the browser, or 'global' on the server.
    var root = this;

    // Load the 3rd party libraries
    define3rdPartyModules();
    // Load our Specs and boot the Jasmine tests
    loadSpecsAndBoot();

    function define3rdPartyModules() {
        // These are already loaded via bundles. 
        // We define them and put them in the root object.
        define('jquery', [], function () { return root.jQuery; });
        define('ko', [], function () { return root.ko; });
        define('amplify', [], function () { return root.amplify; });
        //define('infuser', [], function () { return root.infuser; });
        //define('moment', [], function () { return root.moment; });
        define('sammy', [], function () { return root.Sammy; });
        define('toastr', [], function () { return root.toastr; });
        define('underscore', [], function () { return root._; });
    }

    function loadSpecsAndBoot() {
        // define all specs to test
        require([
            baseTestPath + 'repositories/category.spec',
            baseTestPath + 'services/dataservice.category.spec',
            baseTestPath + 'services/datacontext.spec',
            baseTestPath + 'models/model.category.spec'
        ], StartJasmineTests);
    }


    function StartJasmineTests() {
        // Start-up the Jasmine tests, now that all prerequisites are in place.

        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var htmlReporter = new jasmine.HtmlReporter();

        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function (spec) {
            return htmlReporter.specFilter(spec);
        };


        // exec tests
        jasmineEnv.execute();
    }
})();