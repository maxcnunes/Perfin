using Perfin.Model;

namespace Perfin.Data.Contract
{
    public interface IAccountTypeRepository : IRepository<AccountType>
    {
        AccountType GetByName(string name);
    }
}
