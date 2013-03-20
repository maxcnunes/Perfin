using System;
using System.Web.Optimization;

namespace Perfin.UI.Web
{
    public class DurandalBundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/Scripts/jquery-{version}.js")
                .Include("~/Scripts/knockout-{version}.js")
                .Include("~/Scripts/sammy-{version}.js")
                .Include("~/Scripts/bootstrap.min.js")
                .Include("~/Scripts/toastr.min.js")
                .Include("~/Scripts/amplify.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/css")
                .Include("~/Content/ie10mobile.css")
                .Include("~/Content/bootstrap.min.css")
                .Include("~/Content/bootstrap-responsive.min.css")
                .Include("~/Content/font-awesome.min.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/app.css")
              );

            // Tests - Jasmine
            bundles.Add(
                new ScriptBundle("~/scripts/jstests")
                  .Include("~/Scripts/jasmine.js")
                  .Include("~/Scripts/jasmine-html.js")
                  .IncludeDirectory("~/App/tests", "*.js", searchSubdirectories: true)
                  //.IncludeDirectory("~/App/viewmodels", "*.js", searchSubdirectories: true)
                  //just examples: remove this later
                  .IncludeDirectory("~/Scripts/jasmine-samples", "*.js", searchSubdirectories: true)
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