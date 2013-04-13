using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Data.Helper;

namespace Perfin.Test.Data
{
    [TestClass]
    public class TestDBConnectionTests
    {
        [TestMethod]
        public void Should_Connect_Test_DB()
        {
            var connection = MySqlDataHelper.GetConnectionStringFromAppSettings();
            MySqlDataHelper.ExecuteDbScript("SELECT version()", connection);
        }
    }
}
