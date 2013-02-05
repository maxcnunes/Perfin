using NHibernate;
using NHibernate.Criterion;
using Perfin.Data.Contract;
using Perfin.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Data.Repository
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(ISession dbSession) : base(dbSession) { }

        public User GetByLogin(string login)
        {
            var user = _dbSession
                        .CreateCriteria(typeof(User))
                        .Add(Restrictions.Eq("Login", login))
                        .UniqueResult<User>();

            return user;
        }
    }
}
