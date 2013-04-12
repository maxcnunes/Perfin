using MySql.Data.MySqlClient;
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
            var sqlScript = ReadDbScript(pathSqlScript);
            ExecuteDbScript(sqlScript, connectionString);
        }

        private static string ReadDbScript(string pathSqlScript)
        {
            StreamReader streamReader = new StreamReader(pathSqlScript);
            string sqlScript = streamReader.ReadToEnd();
            streamReader.Close();
            return sqlScript;
        }
    }
}
