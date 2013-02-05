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
    public class CategoryRepositoryTest
    {
        IUnitOfWork unitOfWork;
        
        /*
         * Initialize
         */
        //[TestInitialize]
        //public void Initialize()
        //{
        //    var kernel = new StandardKernel(); // Ninject IoC

        //    kernel.Bind<RepositoryFactories>().To<RepositoryFactories>().InSingletonScope();
        //    kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>();
        //    kernel.Bind<IUnitOfWork>().To<UnitOfWork>();

        //    unitOfWork = kernel.Get<IUnitOfWork>();
        //}




        /*
         * Tests
         */
        [TestMethod]
        public void Should_Create_Category()
        {
            var category = CreateNewCategoryToTest("Casa");
            Assert.IsTrue(category.Id > 0);
        }

        [TestMethod]
        public void Should_Get_First_Category_On_Database()
        {
            var category = GetCategoryOnDatabase();
            Assert.IsNotNull(category);
        }

        [TestMethod]
        public void Should_Update_First_Category_On_Database()
        {
            var category = GetCategoryOnDatabase();

            category.Name= "Name updated";
            unitOfWork.Categories.Update(category);

            unitOfWork.Commit();

            Assert.IsTrue(category.Name == "Name updated");
        }

        [TestMethod]
        public void Should_Delete_First_Category_On_Database()
        {
            var category = GetCategoryOnDatabase();

            unitOfWork.Categories.Delete(category);
            unitOfWork.Commit();

            Assert.IsNull(unitOfWork.Categories.GetById(category.Id));
        }




        private Category CreateNewCategoryToTest(string categoryName = null, bool commitInTheEnd = true)
        {
            //Get category available
            var random = new Random();
            categoryName = "My Category";
            try
            {

                while (unitOfWork.Categories.GetByName(categoryName) != null)
                {
                    categoryName = string.Format("My Category{0}", random.Next());
                }

                //Create new Category to Test
                var category = new Category(categoryName, 0);
                unitOfWork.Categories.Add(category);

                if (commitInTheEnd)
                    unitOfWork.Commit();
                return category;

            }
            catch (Exception)
            {
                    
                throw;
            }
        }

        public Category GetCategoryOnDatabase()
        {
            return unitOfWork.Categories.GetAll().First();
        }
        

    }
}
