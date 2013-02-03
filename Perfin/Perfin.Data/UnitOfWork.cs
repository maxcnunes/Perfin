using System;
using System.Data;
using NHibernate;
using Tracker.Data.Infrastructure;
using Perfin.Model;
using Perfin.Data;

namespace Tracker.Data.NHibernate
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly ISessionFactory _sessionFactory;
		private readonly ITransaction _transaction;
		public ISession Session { get; private set; }

        public UnitOfWork(IRepositoryProvider repositoryProvider)
		{
            CreateDbContext();

            //ISessionFactory sessionFactory
			//_sessionFactory = sessionFactory;

            //private const string _connectionString =@"Server=localhost; Port=3306; Database=trucktracker; Uid=root; Pwd='your_own_password';";
            const string _connectionString = @"Server=localhost; Port=3306; Database=perfin; Uid=root; Pwd=123;";

            NHibernateHelper helper = new NHibernateHelper(_connectionString);
            _sessionFactory = helper.SessionFactory;

            Session = _sessionFactory.OpenSession();
            Session.FlushMode = FlushMode.Auto;
            _transaction = Session.BeginTransaction(IsolationLevel.ReadCommitted);

            _sessionFactory = helper.SessionFactory;

            repositoryProvider.DbContext = Session;
            RepositoryProvider = repositoryProvider;   
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

        protected void CreateDbContext()
        {

        }

        //private ISession DbContext { get; set; }

		public void Dispose()
		{
			if(Session.IsOpen)
			{
				Session.Close();
			}
		}

		public void Commit()
		{
			if(!_transaction.IsActive)
			{
				throw new InvalidOperationException("No active transation");
			}
			_transaction.Commit();
		}

		public void Rollback()
		{
			if(_transaction.IsActive)
			{
				_transaction.Rollback();
			}
		}
	}
}