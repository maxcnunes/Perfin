using NHibernate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Data.Helper
{
    public interface INHibernateSessionBuilder
    {
        ISessionFactory SessionFactory { get; }
    }
}
