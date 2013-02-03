using FluentNHibernate.Mapping;
using Perfin.Model;

namespace Tracker.Data.NHibernate.Maps
{
	public class DriverMap : ClassMap<User>
	{
		public DriverMap()
		{
			Table("User");
            Id(x => x.Id).GeneratedBy.Increment();
			Map(x => x.Login);
			//References(x => x.Truck).Column("TruckId");
		}
	}
}
