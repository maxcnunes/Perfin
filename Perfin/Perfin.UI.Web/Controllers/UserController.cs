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
    public class UserController : ApiBaseController
    {
        public UserController(IUnitOfWork uow )
        {
            Uow = uow;
        }

        // GET /api/user
        public IEnumerable<User> Get()
        {
            return Uow.Users.GetAll()
                .OrderBy(c => c.Login);
        }

        // GET /api/user/3
        public User Get(int id)
        {
            var user = Uow.Users.GetById(id);

            if (user != null)
                return user;

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Create a new User
        // POST /api/user
        public HttpResponseMessage Post(User user)
        {
            Uow.Users.Add(user);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, user);

            // Compose location header that tells how to get this session
            // e.g. ~/api/user/3
            response.Headers.Location =
                new Uri(Url.Link(RouteConfig.ControllerAndId, new { id = user.Id }));

            return response;
        }

        // Update an existing user
        // PUT /api/user
        public HttpResponseMessage Put(User user)
        {
            Uow.Users.Update(user);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        // DELETE /api/user/3
        public HttpResponseMessage Delete(int id)
        {
            Uow.Users.Delete(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        // Create a new User
        // POST /api/user
        [HttpPost]
        public HttpResponseMessage Import(User user)
        {
            var dbUser = Uow.Users.GetByOAuthId(user.OAuthId);
            if (dbUser == null)
            {
                Uow.Users.Add(user);
                Uow.Commit();

                var response = Request.CreateResponse(HttpStatusCode.Created, user);

                // Compose location header that tells how to get this session
                // e.g. ~/api/user/3
                response.Headers.Location =
                    new Uri(Url.Link(RouteConfig.ControllerAndId, new { id = user.Id }));

                return response;
            }
            else
            {
                // transfer values to update user
                dbUser.Login = user.Login;
                dbUser.Email = user.Email;
                dbUser.Name = user.Name;

                Uow.Users.Update(dbUser);
                Uow.Commit();

                return Request.CreateResponse(HttpStatusCode.OK, user);
            }
        }
    }
}
