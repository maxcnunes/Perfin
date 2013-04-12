using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Data.Contract;
using Ninject;
using Perfin.Data;
using Perfin.Model;
using System.Collections.Generic;
using System.Linq;
using Perfin.Data.Helper;
using Perfin.Common.Helper;
using Perfin.Test.Config;
namespace Perfin.Test.Data.Repository
{
    [TestClass]
    public class CategoryRepositoryTest
    {
        IUnitOfWork unitOfWork;
        int CategoryIdCreateByScript = 1;

        [ClassInitialize]
        public static void Initilize(TestContext ctx)
        {
            // Initialize Db
            DatabaseConfig.InitializeDbTests();
        }

        [TestInitialize]
        public void TestInitialize()
        {
            var kernel = new StandardKernel(); // Ninject IoC

            kernel.Bind<RepositoryFactories>().To<RepositoryFactories>().InSingletonScope();
            kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>();

            unitOfWork = kernel.Get<IUnitOfWork>();

            // Prepare item db
            DatabaseConfig.PrepareRegisterForTests(SqlScripts.SqlScriptsFileName.CategoryRepositoryTest.TestInitialize);
        }

        [TestCleanup]
        public void TestCleanup()
        {
            // Dispose UOW to allow execute the command to clean the changes
            unitOfWork.Dispose();
            // Clean changes before the next test
            DatabaseConfig.PrepareRegisterForTests(SqlScripts.SqlScriptsFileName.CategoryRepositoryTest.TestCleanup);
        }



        [TestMethod]
        public void Should_Create_Category()
        {
            var category = new Category("Other Test", 0);

            unitOfWork.Categories.Add(category);
            unitOfWork.Commit();

            Assert.IsNotNull(category);
            Assert.IsTrue(category.Id > 0);
        }

        [TestMethod]
        public void Should_Get_Category_By_Id_On_Database()
        {
            var category = unitOfWork.Categories.GetById(CategoryIdCreateByScript);
            Assert.IsNotNull(category);
        }

        [TestMethod]
        public void Should_Update_Category_On_Database()
        {
            var category = unitOfWork.Categories.GetById(CategoryIdCreateByScript);

            string newName = "Name updated";

            category.Name = newName;
            unitOfWork.Categories.Update(category);

            unitOfWork.Commit();

            Assert.IsTrue(category.Name == newName);
        }

        [TestMethod]
        public void Should_Delete_Category_On_Database()
        {
            var category = unitOfWork.Categories.GetById(CategoryIdCreateByScript);

            unitOfWork.Categories.Delete(category);
            unitOfWork.Commit();

            Assert.IsNull(unitOfWork.Categories.GetById(category.Id));
        }
    }
}
