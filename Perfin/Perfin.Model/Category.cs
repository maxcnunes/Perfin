using Perfin.Common;
using Perfin.Common.Helper;

namespace Perfin.Model
{
    public class Category
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual User User { get; set; }

        // allow null column in mysql?? 
        // how we going to define the root Category? 
        // Zero and null or only zero?
        public virtual int Parent { get; set; } 

        public Category() { }
        public Category(string name, int parent = 0)
        {
            Check.Argument.NotNullOrEmpty(name, "name");

            Name = name;
            Parent = parent;
        }
        
        
    }
}
