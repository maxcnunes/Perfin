using NHibernate;
using NHibernate.Criterion;
using Perfin.Data.Contract;
using Perfin.Model;

namespace Perfin.Data.Repository
{
    public class AcccountRepository: Repository<Account>, IAccountRepository
    {
        public AcccountRepository(ISession dbSession) : base(dbSession) { }

        public Account GetByName(string name)
        {
            var account = _dbSession
                .CreateCriteria(typeof (Account))
                .Add(Restrictions.Eq("Name", name))
                .UniqueResult<Account>();

            return account;
        }  
    }
}
