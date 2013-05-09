using Perfin.Model;
using System;
using System.Linq;

namespace Perfin.Data.Contract
{
    public interface IEntryRepository : IRepository<Entry>
    {
        Entry GetByDate(string date);
        IQueryable<Entry> GetTotalTypeTransactionsByMonth(DateTime month, int userId);
        IQueryable<Entry> GetTotalCategoriesByMonth(DateTime month, int userId);
    }
}
