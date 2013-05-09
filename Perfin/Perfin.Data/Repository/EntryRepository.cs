using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Perfin.Data.Contract;
using Perfin.Model;
using System;
using System.Linq;

namespace Perfin.Data.Repository
{
    public class EntryRepository : Repository<Entry>, IEntryRepository
    {
        public EntryRepository(ISession dbSession) : base(dbSession) { }

        public Entry GetByDate(string date)
        {
            var entry = _dbSession
                .CreateCriteria(typeof(Entry))
                .Add(Restrictions.Eq("PaymentDate", date))
                .UniqueResult<Entry>();

            return entry;
        }

        public IQueryable<Entry> GetTotalTypeTransactionsByMonth(DateTime month, int userId)
        {
            var query =
                _dbSession.Query<Entry>()
                    .Where(e => e.User.Id == userId && e.CreateDate.Month == month.Month && e.CreateDate.Year == month.Year)
                    .GroupBy(e => e.TypeTransaction)
                    .Select(c => new Entry
                    {
                        TypeTransaction = c.Key,
                        Amount = c.Sum(item => item.Amount)
                    });

            return query;
        }


        public IQueryable<Entry> GetTotalCategoriesByMonth(DateTime month, int userId)
        {
            var query =
                _dbSession.Query<Category>()
                    .Where(e => e.User.Id == userId)
                    .Select(c => new Entry
                    {
                        Category = c,
                        Amount = c.Entries.Any() ? c.Entries.Where(e => e.CreateDate.Month == month.Month && e.CreateDate.Year == month.Year).Sum(item => item.Amount) : 0
                    });

            return query;
        }
    }
}
