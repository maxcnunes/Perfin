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
    public class CategoryController : ApiBaseController
    {
        public CategoryController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        // GET /api/category
        public IEnumerable<Category> Get()
        {
            return Uow.Categories.GetAllByUserId(CurrentUserId)
                    .OrderBy(c => c.Name);
        }

        // GET /api/category/3
        public Category Get(int id)
        {
            var category = Uow.Categories.GetById(id);

            if (category != null)
                return category;

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        // Create a new Category
        // POST /api/category
        public HttpResponseMessage Post(Category category)
        {
            category.User = new User { Id = CurrentUserId };
            Uow.Categories.Add(category);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, category);

            // Compose location header that tells how to get this session
            // e.g. ~/api/category/3
            response.Headers.Location =
                new Uri(Url.Link(RouteConfig.ControllerAndId, new { id = category.Id }));

            return response;
        }

        // Update an existing category
        // PUT /api/category
        public HttpResponseMessage Put(Category category)
        {
            Uow.Categories.Update(category);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        // DELETE /api/category/3
        public HttpResponseMessage Delete(int id)
        {
            Uow.Categories.Delete(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
