using FluentNHibernate.Mapping;
using Perfin.Model;

namespace Perfin.Data.Map
{
    public class AccountMap : ClassMap<Account>
    {
        public AccountMap()
        {
            Table("Account");
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Name).Unique();
            Map(x => x.Description).Nullable();
            Map(x => x.Type).Not.Nullable();
            Map(x => x.Category).Not.Nullable();
            //Map(x => x.Parent).Nullable();
        }
    }
}
