using NHibernate;
using Perfin.Data.Contract;
using Perfin.Data.Helper;
using System;
using System.Data;

namespace Perfin.Data
{
	public class UnitOfWork : IUnitOfWork
	{
		private ITransaction _transaction;
        public ISession DbSession { get; private set; }

        public UnitOfWork(IRepositoryProvider repositoryProvider)
		{
            CreateDbSession();

            repositoryProvider.DbSession = DbSession;
            RepositoryProvider = repositoryProvider;   
		}

        protected void CreateDbSession()
        {
            NHibernateHelper helper = new NHibernateHelper();
            var _sessionFactory = helper.SessionFactory;

            DbSession = _sessionFactory.OpenSession();
            DbSession.FlushMode = FlushMode.Auto;
            _transaction = DbSession.BeginTransaction(IsolationLevel.ReadCommitted);

            _sessionFactory = helper.SessionFactory;
        }

        /*
         * Repositories
         */
        public IUserRepository Users { get { return GetRepository<IUserRepository>(); } }
	    public ICategoryRepository Categories { get { return GetRepository<ICategoryRepository>(); } }


	    protected IRepositoryProvider RepositoryProvider { get; set; }

        private IRepository<T> GetStandardRepository<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }
        private T GetRepository<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }


        /// <summary>
        /// Save pending changes to database
        /// </summary>
		public void Commit()
		{
			if(!_transaction.IsActive)
				throw new InvalidOperationException("No active transation");
			_transaction.Commit();
		}

        /// <summary>
        /// Undo pending changes
        /// </summary>
		public void Rollback()
		{
			if(_transaction.IsActive)
				_transaction.Rollback();
		}


        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (DbSession != null && DbSession.IsOpen)
                    DbSession.Close();
            }
        }
	}
}