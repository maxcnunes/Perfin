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
            Map(x => x.Amount).Not.Nullable();
            Map(x => x.Description).Nullable();
            Map(x => x.CreateDate).Not.Nullable();
            Map(x => x.EntryDate).Nullable();
            Map(x => x.TypeTransaction).Not.Nullable();
            References(x => x.Category, "CategoryId").Nullable();
            References(x => x.User, "UserId");
        }
    }
}