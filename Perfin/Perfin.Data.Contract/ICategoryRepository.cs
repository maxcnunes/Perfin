using Perfin.Model;

namespace Perfin.Data.Contract
{
    public interface ICategoryRepository : IRepository<Category>
    {
        Category GetByName(string name);
    }
}
