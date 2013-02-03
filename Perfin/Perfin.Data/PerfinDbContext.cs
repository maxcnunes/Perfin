using Perfin.Data.SampleData;
using Perfin.Model;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace Perfin.Data
{
    public class PerfinDbContext : DbContext 
    {
        // ToDo: Move Initializer to Global.asax; don't want dependence on SampleData
        static PerfinDbContext()
        {
            Database.SetInitializer(new PerfinDatabaseInitializer());
        }

        public PerfinDbContext()
            : base(nameOrConnectionString: "Perfin") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            //modelBuilder.Configurations.Add(new SOME_CONFIGURATION());
        }

        public DbSet<User> Users { get; set; }
    }
}