using NHibernate;
using NHibernate.Criterion;
using Perfin.Data.Contract;
using Perfin.Model;

namespace Perfin.Data.Repository
{
    public class AcccountTypeRepository: Repository<AccountType>, IAccountTypeRepository
    {
        public AcccountTypeRepository(ISession dbSession) : base(dbSession) { }

        public AccountType GetByName(string name)
        {
            var accountType = _dbSession
                .CreateCriteria(typeof(AccountType))
                .Add(Restrictions.Eq("Name", name))
                .UniqueResult<AccountType>();

            return accountType;
        }  
    }
}
