using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Perfin.Models.Tests
{
    [TestClass]
    public class UserTest
    {
        [TestMethod]
        public void Should_Create_A_Instance_Of_User()
        {
            var user = new User();
            Assert.IsNotNull(user);
            Assert.IsInstanceOfType(user, typeof(User));
        }
    }
}
