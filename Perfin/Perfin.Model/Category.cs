using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Model
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Parent { get; set; }
    }
}
