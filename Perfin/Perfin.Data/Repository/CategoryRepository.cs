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
                                    Parent = c.Parent
                                });

            return categories;
        } 
    }
}
