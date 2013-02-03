using System;

namespace Tracker.Data.Infrastructure
{
	public interface IGuidKeyedReadOnlyRepository<TEntity> : IReadOnlyRepository<TEntity> where TEntity:class
	{
		TEntity FindBy(Guid id);
	}
}