using Perfin.Model;
using System.Linq;

namespace Perfin.Data.Contract
{
    public interface IAccountRepository : IRepository<Account>
    {
        Account GetByName(string name);
        IQueryable<Account> GetAllByUserId(int userId);
    }
}
