using NHibernate;
using System.Linq;
using NHibernate.Linq;
using Perfin.Data.Contract;

namespace Perfin.Data
{
	public class Repository<T> : NHibernateContext, IRepository<T> where T : class 
	{
		private readonly ISession _session;

		public Repository(ISession session)
		{
			_session = session;
		}

		#region IRepository<T> Members

		public void Add(T entity)
		{
			_session.Save(entity);
		}

        public void Add(System.Collections.Generic.IEnumerable<T> items)
		{
			foreach (T item in items)
				_session.Save(item);
		}

        public void Update(T entity)
		{
			_session.Update(entity);
		}

        public void Delete(T entity)
		{
			_session.Delete(entity);
		}

		public void Delete(System.Collections.Generic.IEnumerable<T> entities)
		{
			foreach (T entity in entities)
				_session.Delete(entity);
		}

		#endregion

        #region IReadOnlyRepository<T> Members

        public T GetById(int id)
		{
			return _session.Get<T>(id);
		}

		public IQueryable<T> GetAll()
		{
			return _session.Linq<T>();
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