using NHibernate;
using NHibernate.Criterion;
using Perfin.Data.Contract;
using Perfin.Model;

namespace Perfin.Data.Repository
{
    public class CategoryRepository: Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(ISession dbSession) : base(dbSession) { }

        public Category GetByName(string name)
        {
            var category = _dbSession
                .CreateCriteria(typeof (Category))
                .Add(Restrictions.Eq("Name", name))
                .UniqueResult<Category>();

            return category;
        }  
    }
}
