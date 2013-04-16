using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using Perfin.Common;
using Perfin.Common.Helper;
using System.Reflection;

namespace Perfin.Data.Helper
{
    public class NHibernateSessionProvider : INHibernateSessionProvider
    {
        private readonly string _connectionString;
        private ISessionFactory _sessionFactory;

        public ISessionFactory SessionFactory
        {
            get { return _sessionFactory ?? (_sessionFactory = CreateSessionFactory()); }
        }

        public NHibernateSessionProvider()
        {
            _connectionString = ConfigurationManagerHelper.GetConnectionString("Perfin");
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