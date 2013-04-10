using FluentNHibernate.Mapping;
using Perfin.Model;

namespace Perfin.Data.Map
{
    public class AccountTypeMap : ClassMap<AccountType>
    {
        public AccountTypeMap()
        {
            Table("AccountType");
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Name).Unique();
        }
    }
}
