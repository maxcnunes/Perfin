﻿using NHibernate;
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

        public UnitOfWork(IRepositoryProvider repositoryProvider, INHibernateSessionProvider sessionBuilder)
		{
            CreateDbSession(sessionBuilder);

            repositoryProvider.DbSession = DbSession;
            RepositoryProvider = repositoryProvider;
		}

        public void CreateDbSession(INHibernateSessionProvider sessionBuilder)
        {
            var _sessionFactory = sessionBuilder.SessionFactory;

            DbSession = _sessionFactory.OpenSession();
            DbSession.FlushMode = FlushMode.Auto;
            _transaction = DbSession.BeginTransaction(IsolationLevel.ReadCommitted);
        }

        /*
         * Repositories
         */
        public IUserRepository Users { get { return GetRepository<IUserRepository>(); } }
	    public ICategoryRepository Categories { get { return GetRepository<ICategoryRepository>(); } }
        public IAccountTypeRepository AccountTypes { get { return GetRepository<IAccountTypeRepository>(); } }
        public IAccountRepository Accounts { get { return GetRepository<IAccountRepository>(); } }


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