using FluentNHibernate.Mapping;
using Perfin.Model;

namespace Perfin.Data.Map
{
    public class AccountMap : ClassMap<Account>
    {
        public AccountMap()
        {
            Table("AccountType");
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Name).Unique();
        }
    }
}
