using Perfin.Model;
using System;

namespace Tracker.Data.Infrastructure
{
	public interface IUnitOfWork : IDisposable
	{
        IRepository<User> Users { get; }

		void Commit();
		void Rollback();
	}
}