using NHibernate;
using NHibernate.Criterion;
using Perfin.Data.Contract;
using Perfin.Model;
using NHibernate.Linq;
using System.Linq;

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


        public System.Linq.IQueryable<Account> GetAllByUserId(int userId)
        {
            var accounts = _dbSession.Query<Account>()
                                .Where(acc => acc.User.Id == userId)
                                .Select(acc => new Account
                                {
                                    Id = acc.Id,
                                    Name = acc.Name,
                                    Description = acc.Description,
                                    Type = new AccountType { Id = acc.Type.Id },
                                    Category = new Category { Id = acc.Category.Id },
                                    User = new User { Id = acc.User.Id }
                                });

            return accounts;
        }
    }
}
