using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Model
{
    public class Entry
    {
        public virtual  int Id { get; set; }
        public virtual decimal Amount { get; set; }
        public virtual string Description { get; set; }
        public virtual Category Category { get; set; }
        public virtual User User { get; set; }
        public virtual int TypeTransaction { get; set; } 
        /// <summary>
        /// When this entry was created
        /// </summary>
        public virtual DateTime CreateDate { get; set; }
        /// <summary>
        /// When this entry was really paied/received
        /// </summary>
        public virtual DateTime? EntryDate { get; set; }

    }
}
