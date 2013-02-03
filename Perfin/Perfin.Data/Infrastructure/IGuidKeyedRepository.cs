using System;

namespace Tracker.Data.Infrastructure
{
	public interface IGuidKeyedRepository<TEntity> : IRepository<TEntity> where TEntity:class 
	{
		TEntity FindBy(Guid id);
	}
}