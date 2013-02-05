using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Perfin.Model;
using NHibernate;
using NHibernate.Criterion;
using Perfin.Data.Contract;

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
