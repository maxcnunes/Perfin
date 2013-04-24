using System;
using System.Web;
using System.Web.Optimization;

namespace Perfin.UI.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            // Modernizr goes separate since it loads first
            bundles.Add(new ScriptBundle("~/bundles/modernizr")
                .Include("~/Scripts/modernizr-{version}.js"));

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/knockout-{version}.js")
                .Include("~/Scripts/sammy-{version}.js")
                .Include("~/Scripts/bootstrap.min.js")
                .Include("~/Scripts/toastr.min.js")
                .Include("~/Scripts/q.js")
                .Include("~/Scripts/amplify.js")
                .Include("~/Scripts/underscore.js")
                .Include("~/Scripts/knockout.dirtyFlag.js")
                .Include("~/Scripts/knockout.validation.js")
                .Include("~/Scripts/chosen.jquery.js")
                .Include("~/Scripts/knockout.chosen.js")
              );


            // CSS Files
            bundles.Add(
              new StyleBundle("~/Content/css")
                // Normalize CSS
                .Include("~/Content/boilerplate-normalize.css")

                // Twitter Bootstrap
                .Include("~/Content/bootstrap/ie10mobile.css")
                .Include("~/Content/bootstrap/bootstrap.css")
                .Include("~/Content/bootstrap/bootstrap-responsive.css")

                // Toastr Notifications
                .Include("~/Content/toastr/toastr.css")
                .Include("~/Content/toastr/toastr-responsive.css")

                // Font Awesome Stylesheet
                .Include("~/Content/font-awesome/font-awesome.css")

                // Chosen
                .Include("~/Content/chosen/chosen.css")

                // Main css
                .Include("~/Content/durandal.css")
                .Include("~/Content/app.css")
                .Include("~/Content/main.css")
              );
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}