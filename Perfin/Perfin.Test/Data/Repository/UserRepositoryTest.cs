using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Data.Contract;
using Ninject;
using Perfin.Data;
using Perfin.Model;
using System.Collections.Generic;
using System.Linq;


namespace Perfin.Test.Data.Repository
{
    [TestClass]
    public class UserRepositoryTest
    {
        IUnitOfWork unitOfWork;
        IList<User> users = new List<User>
        {
            new User{Login = "Pedro"},
            new User{Login = "Maria"},
            new User{Login = "Souza"},
            new User{Login = "Margarida"},
            new User{Login = "Joana"},
            new User{Login = "Paula"},
            new User{Login = "Bordao"},
            new User{Login = "Fred"},
            new User{Login = "John"},
            new User{Login = "Mario"}
        };

        [TestInitialize]
        public void DependencyResolver()
        {
            var kernel = new StandardKernel(); // Ninject IoC

            // These registrations are "per instance request".
            // See http://blog.bobcravens.com/2010/03/ninject-life-cycle-management-or-scoping/

            kernel.Bind<RepositoryFactories>().To<RepositoryFactories>().InSingletonScope();
            kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>();


            unitOfWork = kernel.Get<IUnitOfWork>();

            //// Tell WebApi how to use our Ninject IoC
            //config.DependencyResolver = new NinjectDependencyResolver(kernel);
        }

        [TestMethod]
        public void Should_Add_10_Users()
        {
            users.ToList().ForEach(user => unitOfWork.Users.Add(user));
            unitOfWork.Commit();

            users.ToList().ForEach(user => Assert.IsTrue(user.Id > 0));
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

        public User GetUserOnDatabase()
        {
            var user = unitOfWork.Users.GetAll().First();
            return user;
        }
    }
}
