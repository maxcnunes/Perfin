using Perfin.Data.Contract;
using Perfin.Model;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;

namespace Perfin.UI.Web.Controllers
{
    public class ChartController : ApiBaseController
    {
        public ChartController(IUnitOfWork uow)
        {
            Uow = uow;
        }

        // GET api/chart/TotalTypeTransactionsByMonth
        [HttpGet, ActionName("TotalTypeTransactionsByMonth")]
        public IEnumerable<object> TotalTypeTransactionsByMonth()
        {
            var query = Uow.Entries.GetTotalTypeTransactionsByMonth(DateTime.Today, CurrentUserId)
                        .Select(i => new
                        {
                            TypeTransaction = Enum.GetName(typeof(Types.TypeTransactions), i.TypeTransaction),
                            Amount = i.Amount
                        });

            return query;
        }

        // GET api/chart/TotalCategoriesByMonth
        [HttpGet, ActionName("TotalCategoriesByMonth")]
        public IEnumerable<object> TotalCategoriesByMonth()
        {
            var query = Uow.Entries.GetTotalCategoriesByMonth(DateTime.Today, CurrentUserId)
                        .Select(i => new
                        {
                            Id = i.Category.Id,
                            Category = i.Category.Name,
                            ParentCategoryId = i.Category.ParentCategoryId,
                            Amount = i.Amount
                        });

            return query;
        }
    }
}
