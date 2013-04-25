using Perfin.Data.Contract;
using System.Linq;
using System.Security.Claims;
using System.Web.Http;

namespace Perfin.UI.Web.Controllers
{
    public class ApiBaseController : ApiController
    {
        protected IUnitOfWork Uow { get; set; }

        protected string CurrentUserOAuthId
        {
            get { return ClaimsPrincipal.Current.Claims.SingleOrDefault(c => c.Type == "sub").Value; }
        }

        protected int CurrentUserId
        {
            get { return Uow.Users.GetIdByOAuthId(CurrentUserOAuthId); }
        }
    }
}
