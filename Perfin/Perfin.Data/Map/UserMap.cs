using FluentNHibernate.Mapping;
using Perfin.Model;

namespace Perfin.Data.Map
{
    public class UserMap : ClassMap<User>
    {
        public UserMap()
        {
            Table("User");
            Id(x => x.Id).GeneratedBy.Increment();
            Map(x => x.Login).Unique();
            Map(x => x.Password).Not.Nullable();
            Map(x => x.Email).Nullable();
            Map(x => x.Name).Nullable();
            Map(x => x.Salt).Nullable();
        }
    }
}
