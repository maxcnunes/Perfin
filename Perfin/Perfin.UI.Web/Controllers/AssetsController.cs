using Newtonsoft.Json.Linq;
using Perfin.Common.Helper;
using Perfin.Data.Contract;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Perfin.UI.Web.Controllers
{
    public class AssetsController : ApiBaseController
    {
        //
        // GET: /Assets/
        [AllowAnonymous]
        public HttpResponseMessage Get()
        {
            // Load configurations values to be used on spa
            var config = new JObject();
            config["auth0ClientId"] = ConfigurationManagerHelper.GetAppSetting("AUTH0_CLIENT_ID");

            return Request.CreateResponse(HttpStatusCode.OK, config);
        }

    }
}
