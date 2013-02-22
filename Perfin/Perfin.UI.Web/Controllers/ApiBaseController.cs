using Perfin.Data.Contract;
using System.Web.Http;

namespace Perfin.UI.Web.Controllers
{
    public abstract class ApiBaseController : ApiController
    {
        // NOT NECESSARY TO DISPOSE THE UOW IN OUR CONTROLLERS
        // We let IoC inject the Uow into our controllers
        // We can depend upon on IoC to dispose the UoW for us
        // when Web API disposes the IoC container

        protected IUnitOfWork Uow { get; set; }
    }
}
