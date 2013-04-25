using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Perfin.Data.Contract;
using Perfin.Model;
using System.Linq;

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

        public User GetByOAuthId(string oAuthId)
        {
            var user = _dbSession
                        .CreateCriteria(typeof(User))
                        .Add(Restrictions.Eq("OAuthId", oAuthId))
                        .UniqueResult<User>();

            return user;
        }

        public int GetIdByOAuthId(string oAuthId)
        {
            if(!oAuthId.Contains("|"))
                oAuthId = "|" + oAuthId;

            var userId = _dbSession.Query<User>()
                            .Where(u => u.OAuthId.Contains(oAuthId))
                            .Select(u => u.Id).FirstOrDefault();

            return userId;
        }
    }
}
