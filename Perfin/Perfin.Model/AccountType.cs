using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Model
{
    /// <summary>
    /// Class account type
    /// -> Income
    /// -> Expense
    /// </summary>
    public class AccountType 
    {
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }

        public AccountType() { }
    }
}
