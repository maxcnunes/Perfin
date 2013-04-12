using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Test.Config
{
    public static class TestConfiguration
    {
        /// <summary>
        /// Temp folder created on post build event
        /// </summary>
        public static string pathDirectoryTest = Directory.GetCurrentDirectory();
        public static string pathScriptsDatabaseTests = Path.Combine(pathDirectoryTest, "ScriptsDatabaseTests");
    }
}
