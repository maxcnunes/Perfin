using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.IO;
using Perfin.Test.Config;
using Perfin.Data.Helper;
using Perfin.Common.Helper;

namespace Perfin.Test
{
    [TestClass]
    public class AppHarborTests
    {
        [TestMethod]
        public void Show_Environment()
        {
            //var env = Environment.GetEnvironmentVariable("Environment");
            var env = ConfigurationManagerHelper.GetAppSetting("Environment");
            throw new Exception("\nTest Outpu:==>" + env);
        }

        [TestMethod]
        public void Show_DbServer()
        {
            var env = Environment.GetEnvironmentVariable("DbServer");
            throw new Exception("\nTest Outpu:==>" + env);
        }

        [TestMethod]
        public void ConnectionStringDB()
        {
            var connection = MySqlDataHelper.GetConnectionStringFromAppSettings();
            throw new Exception("\nTest Outpu:==>" + connection);
        }

        [TestMethod]
        public void CurrentDirectory()
        {
            throw new Exception("\nTest Outpu:==>" + TestConfig.pathProjectTests);
        }

        [TestMethod]
        public void AllItemsOfCurrentDirectory()
        {
            var currentDirectory = new DirectoryInfo(TestConfig.pathScriptsDatabaseTests);
            string allItems = string.Empty;
            foreach (var item in currentDirectory.GetFileSystemInfos())
            {
                allItems += "\n" + item.Name;
            }
            throw new Exception("\nTest Outpu:==>" + allItems);
        }

        [TestMethod]
        public void Exists_Diirectory_ScriptsDatabaseTests_File_01GenerateMySQLDatabsesql()
        {
            Assert.IsTrue(File.Exists(Path.Combine(TestConfig.pathScriptsDatabaseTests, "01.GenerateMySQLDatabse.sql")));
        }

        [TestMethod]
        public void Exists_File_01GenerateMySQLDatabsesql()
        {
            Assert.IsTrue(File.Exists(Path.Combine(TestConfig.pathProjectTests, "01.GenerateMySQLDatabse.sql")));
        }

        [TestMethod]
        public void Exists_Current_Directory_File_01GenerateMySQLDatabsesql()
        {
            string file = Path.Combine(TestConfig.pathScriptsDatabaseTests, "01.GenerateMySQLDatabse.sql");
            Assert.IsTrue(File.Exists(file));
        }
    }
}
