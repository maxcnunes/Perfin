using NHibernate;
using NHibernate.Linq;
using Perfin.Common;
using Perfin.Data.Contract;
using System.Linq;

namespace Perfin.Data
{
	public class Repository<T> : NHibernateContext, IRepository<T> where T : class 
	{
		protected readonly ISession _dbSession;

		public Repository(ISession dbSession)
		{
            Check.Argument.NotNull(dbSession, "dbSession");

            _dbSession = dbSession;
		}

		#region IRepository<T> Members

		public void Add(T entity)
		{
			_dbSession.Save(entity);
		}

        public void Add(System.Collections.Generic.IEnumerable<T> items)
		{
			foreach (T item in items)
				_dbSession.Save(item);
		}

        public void Update(T entity)
		{
			_dbSession.Update(entity);
		}

        public void Delete(int id)
        {
            // Get item by id
            var item = _dbSession.Get<T>(id);
            // Delete
            _dbSession.Delete(item);
        }

        public void Delete(T entity)
		{
			_dbSession.Delete(entity);
		}

		public void Delete(System.Collections.Generic.IEnumerable<T> entities)
		{
			foreach (T entity in entities)
				_dbSession.Delete(entity);
		}

		#endregion

        #region IReadOnlyRepository<T> Members

        public T GetById(int id)
		{
			return _dbSession.Get<T>(id);
		}

		public IQueryable<T> GetAll()
		{
			return _dbSession.Query<T>();
		}

		public T FindBy(System.Linq.Expressions.Expression<System.Func<T, bool>> expression)
		{
			return FilterBy(expression).Single();
		}

		public IQueryable<T> FilterBy(System.Linq.Expressions.Expression<System.Func<T, bool>> expression)
		{
			return GetAll().Where(expression).AsQueryable();
		}

		#endregion


        
    }
}