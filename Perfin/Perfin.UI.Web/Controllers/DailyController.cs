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
    public class DailyController : ApiBaseController
    {
        public DailyController(IUnitOfWork uow)
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
                    Category = new Category { Id = entry.Category.Id },
                    User = new User { Id = entry.User.Id }
                }).OrderBy(e => e.EntryDate);

            return query;
        }
    }
}
