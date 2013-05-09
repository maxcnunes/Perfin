using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Dialect;
using Perfin.Common;
using Perfin.Common.Helper;
using System;
using System.Reflection;

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
            _connectionString = ConfigurationManagerHelper.GetConnectionString("Perfin");
        }

        private ISessionFactory CreateSessionFactory()
        {
            return Fluently.Configure()
            .Database(MySQLConfiguration.Standard.Dialect<MySQL5Dialect>().ConnectionString(_connectionString))
            .Mappings(m => m.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
            .BuildSessionFactory();
        }
    }
}