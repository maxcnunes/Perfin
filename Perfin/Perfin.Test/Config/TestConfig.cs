using System.IO;
using System.Reflection;

namespace Perfin.Test.Config
{
    public static class TestConfig
    {
        /// <summary>
        /// Temp folder created on post build event
        /// </summary>
        public static string pathProjectTests = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
        public static string pathScriptsDatabaseTests = Path.Combine(pathProjectTests, "Config", "ScriptsDBTests");
    }
}
