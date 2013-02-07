using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Data.Contract;
using Perfin.Data;
using Ninject;
using Moq;
using Perfin.Service;
using Perfin.Model;

namespace Perfin.Test.Service
{
    [TestClass]
    public class UserServiceTest
    {
        [TestMethod]
        public void Should_Authenticate_Valid_User()
        {
            var userMock = new Mock<User>();
            userMock.Setup(i => i.VerifyPasswordMatch(It.IsAny<string>())).Returns(true);

            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(i => i.GetByLogin(It.IsAny<string>())).Returns(userMock.Object);

            var userService = new UserService(userRepositoryMock.Object);

            var authenticated = userService.Authenticate(It.IsAny<string>(), It.IsAny<string>());

            Assert.IsTrue(authenticated);
        }

        [TestMethod]
        public void Should_Register_User()
        {
            string login = "admin";
            string password = "123";
            string passwordConfirm = "123";

            var userMock = new Mock<User>();
            userMock.Setup(i => i.VerifyPasswordMatch(It.IsAny<string>())).Returns(true);

            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(i => i.GetByLogin(It.IsAny<string>())).Returns(userMock.Object);

            var userService = new UserService(userRepositoryMock.Object);

            var success = false;
            try
            {
                userService.Register(login, password, passwordConfirm);
                success = true;
            }
            catch
            {
                success = false;
            }

            Assert.IsTrue(success);
        }

        [TestMethod]
        public void Should_Not_Register_User_With_Passwords_Not_Matching()
        {
            string login = "admin";
            string password = "123";
            string passwordConfirm = "321";

            var userMock = new Mock<User>();
            userMock.Setup(i => i.VerifyPasswordMatch(It.IsAny<string>())).Returns(true);

            var userRepositoryMock = new Mock<IUserRepository>();
            userRepositoryMock.Setup(i => i.GetByLogin(It.IsAny<string>())).Returns(userMock.Object);

            var userService = new UserService(userRepositoryMock.Object);

            var success = false;
            try
            {
                userService.Register(login, password, passwordConfirm);
                success = true;
            }
            catch
            {
                success = false;
            }

            Assert.IsFalse(success);
        }
    }
}
