
namespace Perfin.Service.Contract
{
    public interface IService<TEntity> : IReadOnlyService<TEntity> where TEntity : class
    {
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
    }
}
