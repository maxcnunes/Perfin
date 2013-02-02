using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Model;

namespace Perfin.Test.Model
{
    [TestClass]
    public class AccountTest
    {
        [TestMethod]
        public void Should_Create_A_Instance_Of_Account()
        {
            var account = new Account();
            Assert.IsNotNull(account);
            Assert.IsInstanceOfType(account, typeof(Account));
        }

        [TestMethod]
        public void Should_Set_Values_For_The_Properties()
        {
            var account = new Account();

            var id = 1;
            var name = "Account Name";
            var description = "This account refers to the simple test";
            var type = 1;
            var category = 2;
            
            account.Id = id;
            account.Name = name;
            account.Description = description;
            account.Type = type;
            account.Category = category;

            Assert.IsNotNull(account);
            Assert.AreEqual(id, account.Id);
            Assert.AreEqual(name, account.Name);
            Assert.AreEqual(description, account.Description);
            Assert.AreEqual(type, account.Type);
            Assert.AreEqual(category, account.Category);
        }
    }
}
