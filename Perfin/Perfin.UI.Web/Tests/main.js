// Config base js App path
require.config({
    baseUrl: '/App/'
});


require([
    '../tests/repositories/category.spec'],
    function () {
        $(function () {
            var jasmineEnv = jasmine.getEnv();
            jasmineEnv.updateInterval = 1000;

            var htmlReporter = new jasmine.HtmlReporter();

            jasmineEnv.addReporter(htmlReporter);

            jasmineEnv.specFilter = function (spec) {
                return htmlReporter.specFilter(spec);
            };


            // exec tests
            jasmineEnv.execute();
        });
    });