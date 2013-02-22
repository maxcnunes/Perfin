using System.Web;
using System.Web.Optimization;

namespace Perfin.UI.Web
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            // Force optimization to be on or off, regardless of web.config setting
            //BundleTable.EnableOptimizations = false;
            bundles.UseCdn = false;

            // .debug.js, -vsdoc.js and .intellisense.js files 
            // are in BundleTable.Bundles.IgnoreList by default.
            // Clear out the list and add back the ones we want to ignore.
            // Don't add back .debug.js.
            bundles.IgnoreList.Clear();
            bundles.IgnoreList.Ignore("*-vsdoc.js");
            bundles.IgnoreList.Ignore("*intellisense.js");

            // Modernizr goes separate since it loads first
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/lib/modernizr-{version}.js"));

            // jQuery
            bundles.Add(new ScriptBundle(
                "~/bundles/jquery",
                "//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"
            ).Include("~/Scripts/lib/jquery-{version}.js"));

            // 3rd Party JavaScript files
            bundles.Add(new ScriptBundle("~/bundles/jsextlibs").Include(
                // NOT USED YET
                //"~/Scripts/lib/json2.js", // IE7 needs this

                // NOT USED YET
                //// jQuery plugins
                //"~/Scripts/lib/activity-indicator.js",
                //"~/Scripts/lib/jquery.mockjson.js",
                //"~/Scripts/lib/TrafficCop.js",
                //"~/Scripts/lib/infuser.js", // depends on TrafficCop

                // Knockout and its plugins
                "~/Scripts/lib/knockout-{version}.js",
                // NOT USED YET
                //"~/Scripts/lib/knockout.activity.js",
                //"~/Scripts/lib/knockout.asyncCommand.js",
                //"~/Scripts/lib/knockout.dirtyFlag.js",
                //"~/Scripts/lib/knockout.validation.js",
                //"~/Scripts/lib/koExternalTemplateEngine.js",

                 // NOT USED YET
                //// Other 3rd party libraries
                //"~/Scripts/lib/underscore.js",
                //"~/Scripts/lib/moment.js",
                //"~/Scripts/lib/sammy.*",
                "~/Scripts/lib/amplify.*"
                //"~/Scripts/lib/toastr.js"
            ));

            // NOT USED YET
            //bundles.Add(new ScriptBundle("~/bundles/jsmocks")
            //    .IncludeDirectory("~/Scripts/app/mock", "*.js", searchSubdirectories: false));

            // All application JS files (except mocks)
            bundles.Add(new ScriptBundle("~/bundles/jsapplibs")
                .IncludeDirectory("~/Scripts/app/", "*.js", searchSubdirectories: false));

            // 3rd Party CSS files
            bundles.Add(new StyleBundle("~/Content/3rdpartycss").Include(
                // Normalize CSS
                "~/Content/boilerplate-normalize.css",

                // Twitter Bootstrap
                "~/Content/bootstrap/css/bootstrap.css",
                "~/Content/bootstrap/css/bootstrap-responsive.css",

                //"~/Content/toastr.css", NOT USED YET
                //"~/Content/toastr-responsive.css" NOT USED YET

               // Main css
                "~/Content/main.css"
            ));

            // Fonts CSS files
            bundles.Add(new StyleBundle("~/Content/fontscss").Include(
                // Font Awesome Stylesheet
                "~/Content/font-awesome/css/font-awesome.css"
           ));


            // App CSS files
            bundles.Add(new StyleBundle("~/Content/css").Include(
                // Main css
                "~/Content/main.css"
            ));


            // NOT USED YET
            //// Custom LESS files
            //bundles.Add(new Bundle("~/Content/Less", new LessTransform(), new CssMinify())
            //    .Include("~/Content/styles.less"));




        }
    }
}