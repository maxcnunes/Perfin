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
    public class InMemoryDatabase : INHibernateSessionProvider, IDisposable
    {
        private Configuration _configuration;
        private ISessionFactory _sessionFactory;
        public ISessionFactory SessionFactory
        {
            get { return _sessionFactory ?? (_sessionFactory = CreateSessionFactory()); }
        }

        protected ISession Session { get; set; }

        public InMemoryDatabase()
        {
            _sessionFactory = CreateSessionFactory();
            Session = _sessionFactory.OpenSession();
            //BuildSchema(Session);
        }

        private ISessionFactory CreateSessionFactory()
        {
            //return Fluently.Configure()
            //  .Database(SQLiteConfiguration.Standard.InMemory().ShowSql())
            //    //.Mappings(m => m.FluentMappings.AddFromAssemblyOf<Perfin.Data.Map.CategoryMap>())
            //  .Mappings(m => m.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
            //  .ExposeConfiguration(cfg => _configuration = cfg)
            //  .BuildSessionFactory();

            return Fluently.Configure()
                .Database(SQLiteConfiguration.Standard.InMemory()
                    .ConnectionString("Data Source=:memory:;Version=3;New=True;Pooling=True;Max Pool Size=1;"))
                .Mappings(m => m.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
                .ExposeConfiguration(config => new SchemaExport(config).Create(true, true))
                .BuildSessionFactory();
        }

        private void BuildSchema(ISession Session)
        {
            var export = new SchemaExport(_configuration);
            export.Execute(true, true, false, Session.Connection, null);
        }

        public void SessionClear()
        {
            Session.Clear();
        }

        public void Dispose()
        {
            Session.Dispose();
        }
    }
}
