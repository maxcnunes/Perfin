using FluentNHibernate.Mapping;
using Perfin.Model;

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
        }
    }
}
