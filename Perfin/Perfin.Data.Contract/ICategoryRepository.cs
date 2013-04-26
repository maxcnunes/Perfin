using Perfin.Model;
using System.Linq;

namespace Perfin.Data.Contract
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Category GetByName(string name);
        IQueryable<Category> GetAllByUserId(int userId);
    }
}
