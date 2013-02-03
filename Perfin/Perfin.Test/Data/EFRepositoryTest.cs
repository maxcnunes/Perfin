using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Perfin.Data.Contract;
using Perfin.Data;

namespace Perfin.Test.Data
{
    [TestClass]
    public class EFRepositoryTest
    {
        IPerfinUow uow;

        public EFRepositoryTest()
        {
            
        }



        //[TestMethod]
        //public void Should_Create_Well_New_Instance_DBContext()
        //{
        //    var fac = new RepositoryFactories();
        //    var provider = new RepositoryProvider(fac);
        //    uow = new PerfinUow(provider);

        //    uow.Users.Add(new Perfin.Model.User());
        //    uow.Commit();

        //    var all = uow.Users.GetAll();
        //}
    }
}
