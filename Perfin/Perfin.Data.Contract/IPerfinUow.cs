using Perfin.Model;

namespace Perfin.Data.Contract
{
    /// <summary>
    /// Interface for the Perfin "Unit of Work"
    /// </summary>
    public interface IPerfinUow
    {
        // Save pending changes to the data store.
        void Commit();

        // Repositories
        //IUserRepository UserRepository { get; }
    }
}