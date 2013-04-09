using Perfin.Model;

namespace Perfin.Data.Contract
{
    public interface IAccountRepository : IRepository<Account>
    {
        Account GetByName(string name);
    }
}
