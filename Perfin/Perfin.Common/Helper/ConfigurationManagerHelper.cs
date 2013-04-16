using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Common.Helper
{
    public class ConfigurationManagerHelper
    {
        internal ConfigurationManagerHelper() { }

        public static string GetConnectionString(string connectionStringName)
        {
            return ConfigurationManager.ConnectionStrings[connectionStringName].ConnectionString;
        }

        public static string GetAppSetting(string key)
        {
            return ConfigurationManager.AppSettings[key];
        }

        public static bool IsEnvironment(Environment env)
        {
            return ConfigurationManager.AppSettings["Environment"] == env.ToString();
        }

        public enum Environment
        {
            Dev, Test
        }
    }
}
