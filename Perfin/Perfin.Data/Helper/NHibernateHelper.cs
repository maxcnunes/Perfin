using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
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
            _connectionString = GetDefaultConnectionString();
        }

        public NHibernateHelper(string connectionString)
        {
            Check.Argument.NotNullOrEmpty(connectionString, "connectionString");
            _connectionString = connectionString;
        }

        private string GetDefaultConnectionString()
        {
            if (ConfigurationManagerHelper.IsEnvironment(ConfigurationManagerHelper.Environment.Test))
                return MySqlDataHelper.GetConnectionStringFromAppSettings();
            else
                return ConfigurationManagerHelper.GetConnectionString("Perfin");
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