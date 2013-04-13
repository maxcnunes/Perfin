using MySql.Data.MySqlClient;
using Perfin.Common;
using Perfin.Common.Helper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Data.Helper
{
    public static class MySqlDataHelper
    {
        public static void ExecuteDbScript(string sqlScript, string connectionString)
        {
            using (MySqlConnection conn = new MySqlConnection(connectionString))
            {
                using (MySqlCommand command = new MySqlCommand(sqlScript, conn))
                {
                    conn.Open();
                    command.ExecuteNonQuery();
                }
            }
        }

        public static void ExecuteDbScriptFromFile(string pathSqlScript, string connectionString)
        {
            var sqlScript = ReadDbScript(pathSqlScript).ReplaceDatabaseName();
            ExecuteDbScript(sqlScript, connectionString);
        }

        private static string ReadDbScript(string pathSqlScript)
        {
            StreamReader streamReader = new StreamReader(pathSqlScript);
            string sqlScript = streamReader.ReadToEnd();
            streamReader.Close();
            return sqlScript;
        }

        public static string GetConnectionStringFromAppSettings()
        {
            string server = ConfigurationManagerHelper.GetAppSetting("DbServer");
            string database = ConfigurationManagerHelper.GetAppSetting("DbDatabase");
            string user = ConfigurationManagerHelper.GetAppSetting("DbUser");
            string password = ConfigurationManagerHelper.GetAppSetting("DbPassword");

            if (string.IsNullOrEmpty(server) || string.IsNullOrEmpty(database) || string.IsNullOrEmpty(user) || string.IsNullOrEmpty(password))
                throw new Exception("Database AppSettings not defined");

            return BuilMySQLConnectionString(server, database, user, password);
        }

        public static string BuilMySQLConnectionString(string server, string database, string user, string password)
        {
            return string.Format("Server={0}; Database={1}; Uid={2}; Pwd={3};", server, database, user, password);
        }

        public static string ReplaceDatabaseName(this string sqlScript)
        {
            return sqlScript.Replace("{DATABASE_NAME}", ConfigurationManagerHelper.GetAppSetting("DbDatabase"));
        }
    }
}
