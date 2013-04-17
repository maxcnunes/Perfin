using Perfin.Model;

namespace Perfin.Data.Contract
{
    public interface IEntryRepository : IRepository<Entry>
    {
        Entry GetByName(string name);
    }
}
