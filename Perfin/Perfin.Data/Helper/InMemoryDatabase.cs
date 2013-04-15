using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;
using System;
using System.Reflection;

namespace Perfin.Data.Helper
{
    /// <summary>
    /// Build NHibernate Sessions in Memory with SQLite database
    /// Only used for tests environments
    /// </summary>
    public class InMemoryDatabase : INHibernateSessionBuilder, IDisposable
    {
        private static Configuration _configuration;
        private static ISessionFactory _sessionFactory;
        public ISessionFactory SessionFactory
        {
            get { return _sessionFactory ?? (_sessionFactory = CreateSessionFactory()); }
        }

        protected ISession Session { get; set; }

        protected InMemoryDatabase()
        {
            _sessionFactory = CreateSessionFactory();
            Session = _sessionFactory.OpenSession();
            BuildSchema(Session);
        }

        private static ISessionFactory CreateSessionFactory()
        {
            return Fluently.Configure()
              .Database(SQLiteConfiguration.Standard.InMemory().ShowSql())
              .Mappings(m => m.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
              .ExposeConfiguration(cfg => _configuration = cfg)
              .BuildSessionFactory();
        }

        private static void BuildSchema(ISession Session)
        {
            var export = new SchemaExport(_configuration);
            export.Execute(true, true, false, Session.Connection, null);
        }

        public void Dispose()
        {
            Session.Dispose();
        }
    }
}
