using Perfin.Model;

namespace Perfin.Data.Contract
{
    public interface IUserRepository : IRepository<User>
    {
        User GetByLogin(string login);
    }
}
