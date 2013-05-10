using NHibernate;
using NHibernate.Criterion;
using NHibernate.Linq;
using Perfin.Data.Contract;
using Perfin.Model;
using System.Linq;

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

        public IQueryable<Category> GetAllByUserId(int userId)
        {
            var categories = _dbSession.Query<Category>()
                                .Where(c => c.User.Id == userId)
                                .Select(c => new Category
                                {
                                    Id = c.Id,
                                    Name = c.Name,
                                    ParentCategoryId = c.ParentCategoryId
                                });

            return categories;
        }


        public bool HasDependencies(int id)
        {
            var allParentIds = _dbSession.Query<Category>()
                                    .Where(i => i.ParentCategoryId != null)
                                    .Select(i => i.ParentCategoryId).ToList();

            return _dbSession.Query<Category>()
                        .Any(i => i.Entries.Any() || allParentIds.Contains(i.Id));
        }
    }
}
