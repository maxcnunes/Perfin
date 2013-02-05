﻿using System;
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
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public int Category { get; set; }
        
    }
}
