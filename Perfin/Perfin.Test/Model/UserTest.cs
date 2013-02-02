using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Model;

namespace Perfin.Test.Model
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

        [TestMethod]
        public void Should_Set_Values_For_The_Properties()
        {
            var user = new User();

            var id = 10;
            var login = "login";
            var email = "email";
            var password = "password";
            var name = "name"; 

            user.Id = id;
            user.Login = login;
            user.Email = email;
            user.Password = password;
            user.Name = name;

            Assert.IsNotNull(user);
            Assert.AreEqual(id, user.Id);
            Assert.AreEqual(login, user.Login);
            Assert.AreEqual(email, user.Email);
            Assert.AreEqual(password, user.Password);
            Assert.AreEqual(name, user.Name);
        }
    }
}
