using NHibernate;
using NHibernate.Criterion;
using Perfin.Data.Contract;
using Perfin.Model;

namespace Perfin.Data.Repository
{
    public class EntryRepository: Repository<Entry>, IEntryRepository
    {
        public EntryRepository(ISession dbSession) : base(dbSession) { }

        public Entry GetByDate(string date)
        {
            var entry = _dbSession
                .CreateCriteria(typeof (Entry))
                .Add(Restrictions.Eq("PaymentDate", date))
                .UniqueResult<Entry>();

            return entry;
        }  
    }
}
