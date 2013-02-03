using System;

namespace Tracker.Data.Infrastructure
{
	public interface IUnitOfWork : IDisposable
	{
		void Commit();
		void Rollback();
	}
}