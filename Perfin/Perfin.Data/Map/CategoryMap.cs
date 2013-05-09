using FluentNHibernate.Mapping;
using Perfin.Model;
using System.Linq;
using NHibernate.Linq;

namespace Perfin.Data.Map
{
    public class CategoryMap : ClassMap<Category>
    {
        public CategoryMap()
        {
            Table("Category");
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Name).Not.Nullable().Unique();
            Map(x => x.ParentCategoryId).Nullable();
            References(x => x.User, "UserId");
            HasMany(prop => prop.Entries)
                .KeyColumn("CategoryId")
                .LazyLoad()
                .Fetch.Join()
                .Inverse();
        }
    }
}
