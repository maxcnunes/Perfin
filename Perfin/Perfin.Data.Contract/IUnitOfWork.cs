using Perfin.Data.Contract;
using Perfin.Model;
using System;

namespace Perfin.Data.Contract
{
	public interface IUnitOfWork : IDisposable
	{
		void Commit();
		void Rollback();

        /*
         * Repositories
         */
        IUserRepository Users { get; }

        ICategoryRepository Categories { get; }

	}
}