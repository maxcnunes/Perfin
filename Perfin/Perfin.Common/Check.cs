using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Common
{
    public class Check
    {
        public class Argument
        {
            public static void NotNull<T>(T value, string parameterName) where T : class
            {
                if (value == null)
                    throw new ArgumentNullException(parameterName);
            }

            public static void NotNull<T>(T? value, string parameterName) where T : struct
            {
                if (value == null)
                    throw new ArgumentNullException(parameterName);
            }

            public static void NotNullOrEmpty(string value, string parameterName)
            {
                if (string.IsNullOrEmpty(value as string))
                    throw new ArgumentNullException(parameterName);
            }
        }
    }
}
