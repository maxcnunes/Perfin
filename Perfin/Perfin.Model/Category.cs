using Perfin.Common;
using Perfin.Common.Helper;

namespace Perfin.Model
{
    public class Category
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual User User { get; set; }
        public virtual int? ParentCategoryId { get; set; } 

        public Category() { }
        public Category(string name, int? parent)
        {
            Check.Argument.NotNullOrEmpty(name, "name");

            Name = name;
            ParentCategoryId = parent;
        }
    }
}
