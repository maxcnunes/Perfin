using System;
using System.Data;
using NHibernate;
using Perfin.Data.Contract;
using Perfin.Model;
using Perfin.Data;
using Perfin.Data.Helper;

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

        public IRepository<User> Users { get { return GetStandardRepository<User>(); } }

        protected IRepositoryProvider RepositoryProvider { get; set; }

        private IRepository<T> GetStandardRepository<T>() where T : class
        {
            return RepositoryProvider.GetRepositoryForEntityType<T>();
        }
        private T GetRepository<T>() where T : class
        {
            return RepositoryProvider.GetRepository<T>();
        }



		public void Dispose()
		{
            if (DbSession.IsOpen)
                DbSession.Close();
		}

		public void Commit()
		{
			if(!_transaction.IsActive)
				throw new InvalidOperationException("No active transation");
			_transaction.Commit();
		}

		public void Rollback()
		{
			if(_transaction.IsActive)
				_transaction.Rollback();
		}
	}
}