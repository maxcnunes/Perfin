using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Model
{
    /// <summary>
    /// Account is the main Item in Entry 
    /// </summary>
    public class Account
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual AccountType Type { get; set; }
        public virtual Category Category { get; set; }
        public virtual User User { get; set; }
        
    }
}
