using FluentNHibernate.Mapping;
using Perfin.Model;

namespace Perfin.Data.Map
{
    public class EntryMap : ClassMap<Entry>
    {
        public EntryMap()
        {
            Table("Entry");
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Price).Not.Nullable();
            Map(x => x.Description).Nullable();
            Map(x => x.RegistryDate).Not.Nullable();
            Map(x => x.PaymentDate).Not.Nullable();
            References(x => x.Account, "AccountId");
            References(x => x.User, "UserId");
        }
    }
}