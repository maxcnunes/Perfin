using Perfin.Common.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Perfin.Test.Config
{
    public static class SqlScripts
    {
        public static readonly string DirectoryScripts = TestConfig.pathScriptsDatabaseTests;

        public struct SqlScriptsFileName
        {
            public const string CreadWholeDatabase = "01.GenerateMySQLDatabse.sql";


            public struct CategoryRepositoryTest
            {
                public const string TestInitialize = "CategoryRepositoryTest.TestInitialize.sql";
                public const string TestCleanup = "CategoryRepositoryTest.TestCleanup.sql";
            }            
        }
    }
}
