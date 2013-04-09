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
    public class AccountController : ApiBaseController
   {
        public AccountController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        // GET /api/account
        public IEnumerable<Account> Get()
        {
            return Uow.Accounts.GetAll()
                .OrderBy(c => c.Name);
        }

        // GET /api/account/3
        public Account Get(int id)
        {
            var account = Uow.Accounts.GetById(id);    

            if (account != null)
                return account;

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Create a new Account
        // POST /api/account
        public HttpResponseMessage Post(Account account)
        {
            Uow.Accounts.Add(account);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, account);

            // Compose location header that tells how to get this session
            // e.g. ~/api/account/3
            response.Headers.Location =
                new Uri(Url.Link(RouteConfig.ControllerAndId, new { id = account.Id }));

            return response;
        }

        // Update an existing account
        // PUT /api/account
        public HttpResponseMessage Put(Account account)
        {
            Uow.Accounts.Update(account);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        // DELETE /api/account/3
        public HttpResponseMessage Delete(int id)
        {
            Uow.Accounts.Delete(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        
   }
}
