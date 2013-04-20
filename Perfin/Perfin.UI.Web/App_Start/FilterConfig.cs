using System.Web.Http;
using System.Web.Http.Filters;

namespace Perfin.UI.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(HttpConfiguration config)
        {
            config.Filters.Add(new AuthorizeAttribute());
        }
    }
}