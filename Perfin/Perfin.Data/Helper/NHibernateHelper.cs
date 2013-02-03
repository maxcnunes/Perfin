using System.Reflection;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using Perfin.Common;
using Perfin.Common.Helper;

namespace Perfin.Data.Helper
{
	public class NHibernateHelper
	{
		private readonly string _connectionString;
		private ISessionFactory _sessionFactory;

		public ISessionFactory SessionFactory
		{
			get { return _sessionFactory ?? (_sessionFactory = CreateSessionFactory()); }
		}

        public NHibernateHelper()
        {
            var defaultConnection = ConfigurationManagerHelper.GetConnectionString("Perfin");
            _connectionString = defaultConnection;
        }

        public NHibernateHelper(string connectionString)
		{
            Check.NotNullOrEmpty(connectionString, "connectionString");
            _connectionString = connectionString;
		}

		private ISessionFactory CreateSessionFactory()
		{
			return Fluently.Configure()
				.Database(MySQLConfiguration.Standard.ConnectionString(_connectionString))
				.Mappings(m => m.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
				.BuildSessionFactory();
		}
	}
}