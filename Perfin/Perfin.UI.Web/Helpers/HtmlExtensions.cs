using Perfin.Common.Helper;
using System.Web;
using System.Web.Mvc;

namespace Perfin.UI.Web.Helpers
{
    public static class HtmlExtensions
    {
        public static IHtmlString IncludeAuth0SDKScript(this System.Web.WebPages.Html.HtmlHelper htmlHelper)
        {
            var clientId = ConfigurationManagerHelper.GetAppSetting("AUTH0_CLIENT_ID");
            var srcAuth0 = string.Format("https://sdk.auth0.com/auth0.js#client={0}&scope=openid&response_type=token", clientId);

            var builder = new TagBuilder("script");
            builder.Attributes.Add("src", srcAuth0);
            return MvcHtmlString.Create(builder.ToString());
        }
    }
}