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
    public class EntryController : ApiBaseController
    {
        public EntryController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        // GET api/entry
        public IEnumerable<Entry> Get()
        {
            var query = Uow.Entries.GetAll()
                .Select(entry => new Entry
                {
                    Id = entry.Id,
                    Amount = entry.Amount,
                    Description = entry.Description,
                    CreateDate = entry.CreateDate,
                    EntryDate = entry.EntryDate,
                    TypeTransaction = entry.TypeTransaction,
                    Category = new Category { Id = entry.Category.Id },
                    User = new User { Id = entry.User.Id }
                }).OrderBy(e => e.CreateDate);

            return query;
        }

        // GET /api/entry/1
        public Entry Get(int id)
        {
            var entry = Uow.Entries.GetById(id);

            if (entry != null)
                return entry;

            throw new HttpResponseException(new HttpResponseMessage(HttpStatusCode.NotFound));
        }

        //Create new Entry
        //POST /api/entry
        public HttpResponseMessage Post(Entry entry)
        {
            entry.User = new User { Id = CurrentUserId };
            entry.CreateDate = DateTime.Now;
            Uow.Entries.Add(entry);
            Uow.Commit();

            var response = Request.CreateResponse(HttpStatusCode.Created, entry);

            //Compose location header that tells how to get this session
            // e.g. ~api/entry/1
            response.Headers.Location = 
                new Uri(Url.Link(RouteConfig.ControllerAndId, new { id = entry.Id }));

            return response;
        }

        //Update an existing entry
        //PUT /api/entry/1
        public HttpResponseMessage Put(Entry entry)
        {
            Uow.Entries.Update(entry);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        //DELETE //api/entry/1
        public HttpResponseMessage Delete(int id)
        {
            Uow.Entries.Delete(id);
            Uow.Commit();

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
