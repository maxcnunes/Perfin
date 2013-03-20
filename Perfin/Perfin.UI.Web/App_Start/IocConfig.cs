using Ninject;
using Perfin.Data;
using Perfin.Data.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Perfin.UI.Web
{
    public class IocConfig
    {
        public static void RegisterIoc(HttpConfiguration config)
        {
            var kernel = new StandardKernel(); // Ninject Ioc

            // These registrations are "per instance request"
            // See http://blog.bobcravens.com/2010/03/ninject-life-cycle-management-or-scoping/

            kernel.Bind<RepositoryFactories>().To<RepositoryFactories>()
                .InSingletonScope();

            kernel.Bind<IRepositoryProvider>().To<RepositoryProvider>();
            kernel.Bind<IUnitOfWork>().To<UnitOfWork>();

            // Tell WebApi how to use our Ninject Ioc
            config.DependencyResolver = new NinjectDependencyResolver(kernel);
        }
    }
}