using Microsoft.VisualStudio.TestTools.UnitTesting;
using Ninject;
using Perfin.Data;
using Perfin.Data.Contract;
using Perfin.Model;
using System;
using System.Linq;


namespace Perfin.Test.Data.Repository
{
    [TestClass]
    public class UserRepositoryTest
    {
        IUnitOfWork unitOfWork;

        /*
         * Initialize
         */

        [TestInitialize]
        public void Initialize()
        {
            var kernel = new StandardKernel(); // Ninject IoC

            kernel.Bind<RepositoryFactories>().To<RepositoryFactories>().InSingletonScope();
            kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>();

            unitOfWork = kernel.Get<IUnitOfWork>();
        }

        /*
         * Tests
         */

        [TestMethod]
        public void Should_Create_User_On_Database()
        {
            var user = CreateNewUserToTest();

            Assert.IsTrue(user.Id > 0);
        }

        [TestMethod]
        public void Should_Get_First_User_On_Database()
        {
            var user = GetUserOnDatabase();

            Assert.IsNotNull(user);
        }

        [TestMethod]
        public void Should_Update_First_User_On_Database()
        {
            var user = GetUserOnDatabase();

            user.Login = string.Empty;
            unitOfWork.Users.Update(user);

            unitOfWork.Commit();

            Assert.IsTrue(user.Login == string.Empty);
        }

        [TestMethod]
        public void Should_Delete_First_User_On_Database()
        {
            var user = GetUserOnDatabase();

            unitOfWork.Users.Delete(user);
            unitOfWork.Commit();

            Assert.IsNull(unitOfWork.Users.GetById(user.Id));
        }

        [TestMethod]
        public void Should_Get_User_By_Login_On_Database()
        {
            // Create new user to test
            var user = CreateNewUserToTest();

            // Assert the user was successfully created
            Assert.IsTrue(user.Id > 0);

            // Get user by login
            var userFromDb = unitOfWork.Users.GetByLogin(user.Login);

            Assert.IsNotNull(userFromDb);
        }

        /*
         * Helper Methods
         */

        private User CreateNewUserToTest(string userName = null, bool commitInTheEnd = true)
        {
            // Get login available
            if (string.IsNullOrEmpty(userName))
            {
                var random = new Random();
                userName = "mylogin";

                while (unitOfWork.Users.GetByLogin(userName) != null)
                    userName = string.Format("mylogin{0}", random.Next());
            }

            // Create new user to test
            var user = new User(userName, "mypassword");
            unitOfWork.Users.Add(user);
            if(commitInTheEnd)
                unitOfWork.Commit();
            return user;
        }

        public User GetUserOnDatabase()
        {
            var user = unitOfWork.Users.GetAll().First();
            return user;
        }
    }
}
