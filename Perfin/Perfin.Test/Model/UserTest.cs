using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Model;
using Perfin.Common.Helper;

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

            var login = "login";
            var email = "email";
            var password = "password";
            var name = "name";

            user.Login = login;
            user.Email = email;
            user.Password = password;
            user.Name = name;

            Assert.IsNotNull(user);
            Assert.AreEqual(login, user.Login);
            Assert.AreEqual(email, user.Email);
            Assert.AreEqual(password, user.Password);
            Assert.AreEqual(name, user.Name);
        }

        [TestMethod]
        public void Should_Cryptograph_Password_And_Generate_Salt()
        {
            var user = new User();
            user.Password = "0987$%^@!asak";
            user.CryptographPasswordAndGenerateSalt();

            Assert.IsTrue(!string.IsNullOrEmpty(user.Password));
            Assert.IsTrue(!string.IsNullOrEmpty(user.Salt));
        }

        [TestMethod, ExpectedException(typeof(ArgumentNullException))]
        public void Should_Thows_Exception_When_Try_Cryptograph_Password_And_Generate_Salt_With_Empty_Password()
        {
            var user = new User();
            user.Password = string.Empty;
            user.CryptographPasswordAndGenerateSalt();
        }

        [TestMethod]
        public void Should_Macth_Valid_Password()
        {
            string valid_password = "0987$%^@!asak";
            string salt = string.Empty;

            var user = new User();
            user.Password = CryptographyHelper.EncryptPassword(valid_password, out salt);
            user.Salt = salt;

            var match = user.VerifyPasswordMatch(valid_password);

            Assert.IsTrue(match);
        }

        [TestMethod]
        public void Should_Not_Macth_Wrong_Password()
        {
            string not_valid_password = "977934)((*&&(3";
            string valid_password = "0987$%^@!asak";
            string salt = string.Empty;

            var user = new User();
            user.Password = CryptographyHelper.EncryptPassword(valid_password, out salt);
            user.Salt = salt;

            var match = user.VerifyPasswordMatch(not_valid_password);

            Assert.IsFalse(match);
        }


    }
}
