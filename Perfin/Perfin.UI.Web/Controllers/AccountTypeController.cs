using Perfin.Data.Contract;
using Perfin.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Perfin.UI.Web.Controllers
{
    public class AccountTypeController : ApiBaseController
    {
        public AccountTypeController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        // GET /api/accounttype
        public IEnumerable<AccountType> Get()
        {
            return Uow.AccountTypes.GetAll()
                .OrderBy(c => c.Name);
        }

        // GET /api/accounttype/3
        public AccountType Get(int id)
        {
            var accounttype = Uow.AccountTypes.GetById(id);

            if (accounttype != null)
                return accounttype;

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Create a new AccountType
        // POST /api/accounttype
        public HttpResponseMessage Post(AccountType accounttype)
        {
            Uow.AccountTypes.Add(accounttype);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, accounttype);

            // Compose location header that tells how to get this session
            // e.g. ~/api/accounttype/3
            response.Headers.Location =
                new Uri(Url.Link(RouteConfig.ControllerAndId, new { id = accounttype.Id }));

            return response;
        }

        // Update an existing accounttype
        // PUT /api/accounttype
        public HttpResponseMessage Put(AccountType accounttype)
        {
            Uow.AccountTypes.Update(accounttype);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        // DELETE /api/accounttype/3
        public HttpResponseMessage Delete(int id)
        {
            Uow.AccountTypes.Delete(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


    }

}

