using Perfin.Common.Helper;
using Perfin.Data.Helper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Test.Config
{
    public static class DatabaseConfig
    {
        public static readonly string ConnectionString = ConfigurationManagerHelper.GetConnectionString("Perfin");

        public static void InitializeDbTests()
        {
            PrepareRegisterForTests(SqlScripts.SqlScriptsFileName.CreadWholeDatabase);
        }

        public static void PrepareRegisterForTests(string sqlScriptsFileName)
        {
            string sqlFullPath = Path.Combine(SqlScripts.DirectoryScripts, sqlScriptsFileName);
            MySqlDataHelper.ExecuteDbScriptFromFile(sqlFullPath, ConnectionString);
        }
    }
}
