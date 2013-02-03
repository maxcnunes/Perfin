using System;
using System.Linq;
using System.Linq.Expressions;

namespace Perfin.Data.Contract
{
    public interface IReadOnlyRepository<TEntity> where TEntity : class
    {
        TEntity GetById(int id);
        IQueryable<TEntity> GetAll();
        TEntity FindBy(Expression<Func<TEntity, bool>> expression);
        IQueryable<TEntity> FilterBy(Expression<Func<TEntity, bool>> expression);
    }
}