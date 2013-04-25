using Perfin.Data.Contract;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;

namespace Perfin.UI.Web.Controllers
{
    public class ApiBaseController : ApiController
    {
        protected IUnitOfWork Uow { get; set; }


        protected string GetCurrentUserOAuthId()
        {
            return ClaimsPrincipal.Current.Claims.SingleOrDefault(c => c.Type == "sub").Value;
        }

        protected int GetCurrentUserId()
        {
            return Uow.Users.GetIdByOAuthId(GetCurrentUserOAuthId());
        }
    }
}
