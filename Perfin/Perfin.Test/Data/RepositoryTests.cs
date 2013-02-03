using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Tracker.Data.NHibernate;
using Perfin.Model;
using Ninject;
using Perfin.Data;
using Tracker.Data.Infrastructure;


namespace NHibernateLayerTests
{
    /// <summary>
    /// These are not meant to be 'unit' level tests. They represent
    /// integration level operations and are meant to demonstrate
    /// how to excercise the fluent nhibernate repository.
    /// </summary>
    [TestClass]
    public class RepositoryTests
    {
        //private const string _connectionString =@"Server=localhost; Port=3306; Database=trucktracker; Uid=root; Pwd='your_own_password';";
        private const string _connectionString = @"Server=localhost; Port=3306; Database=perfin; Uid=root; Pwd=123;";


        //[TestMethod, Ignore]
        //public void Add_100_Trucks_With_1000_Location_Points_Each()
        //{
        //    NHibernateHelper helper = new NHibernateHelper(_connectionString);

        //    for (int i = 0; i < 100; i++)
        //    {
        //        // Notice the unit of work we are using is to commit
        //        //	one truck's data at a time.
        //        UnitOfWork unitOfWork = new UnitOfWork();

        //        Repository<User> repository = new Repository<User>(unitOfWork.Session);

        //        var user = new User
        //        {
        //            Login = string.Format("User {0}", i + 1)
        //        };

        //        repository.Add(user);

        //        unitOfWork.Commit();
        //    }
        //}

        IUnitOfWork unitOfWork;

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
        public void Add_10_Users()
        {
            // Notice the unit of work we are using is to commit
            //	one truck's data at a time.
            //UnitOfWork unitOfWork = new UnitOfWork(new Perfin.Data.RepositoryProvider(new Perfin.Data.RepositoryFactories()));

            for (int i = 0; i < 10; i++)
            {
                var user = new User
                {
                    Login = string.Format("User {0}", i + 1)
                };

                unitOfWork.Users.Add(user);
            }
            unitOfWork.Commit();
        }

        //[TestMethod]
        //public void Count_The_Number_Of_Locations_In_The_Db()
        //{
        //    NHibernateHelper helper = new NHibernateHelper(_connectionString);
        //    UnitOfWork unitOfWork = new UnitOfWork(helper.SessionFactory);
        //    Repository<Location> repository = new Repository<Location>(unitOfWork.Session);

        //    // This call uses LINQ to NHibernate to create an optimized SQL query.
        //    //	So instead of pulling all the entities from the DB and then using
        //    //	LINQ to count them, it instead pushes the counting to the DB by
        //    //	generating the appropriate SQL. Much much much faster!
        //    int count = repository.All().Count();
        //}

        //[TestMethod]
        //public void Given_A_Driver_Determine_The_Last_Known_Location()
        //{
        //    NHibernateHelper helper = new NHibernateHelper(_connectionString);
        //    UnitOfWork unitOfWork = new UnitOfWork(helper.SessionFactory);
        //    Repository<Driver> driverRepo = new Repository<Driver>(unitOfWork.Session);
        //    Driver driver = driverRepo.All().First();
        //    if(driver!=null)
        //    {
        //        // At this point LINQ to NHibernate has not loaded all the Location entities.
        //        //	Because of LINQ's delayed execution, the following query can be optimized
        //        //	to let the DB do the filtering.
        //        Location lastLocation = driver.Truck.Locations.OrderByDescending(x => x.Timestamp).First();
        //    }
        //}

        //[TestMethod]
        //public void Get_The_Last_10_Locations_Of_A_Given_Truck()
        //{
        //    NHibernateHelper helper = new NHibernateHelper(_connectionString);
        //    UnitOfWork unitOfWork = new UnitOfWork(helper.SessionFactory);
        //    Repository<Truck> repository = new Repository<Truck>(unitOfWork.Session);
        //    Truck truck = repository.All().First();
        //    if(truck != null)
        //    {
        //        // Again the power of LINQ to NHibernates optimized queries and delayed execution.
        //        IEnumerable<Location> pagedLocations = truck.Locations.OrderByDescending(x => x.Timestamp).Take(10);
        //    }
        //}

        //[TestMethod]
        //public void Delete_All_DataValues()
        //{
        //    NHibernateHelper helper = new NHibernateHelper(_connectionString);
        //    UnitOfWork unitOfWork = new UnitOfWork(helper.SessionFactory);

        //    unitOfWork.Session.Delete("from Location o");
        //    unitOfWork.Commit();
        //}

        //[TestMethod]
        //public void Add_Realistic_Random_Routes_To_Trucks()
        //{
        //    NHibernateHelper helper = new NHibernateHelper(_connectionString);
        //    UnitOfWork unitOfWork = new UnitOfWork(helper.SessionFactory);
        //    Repository<Truck> repository = new Repository<Truck>(unitOfWork.Session);
        //    IQueryable<Truck> trucks = repository.All();

        //    DateTime start = DateTime.Now.AddYears(-1);
        //    DateTime stop = DateTime.Now;
        //    const int numPoints = 1000;

        //    foreach (Truck truck in trucks)
        //    {
        //        AddRandomRoute(10, start, stop, truck);
        //    }

        //    unitOfWork.Commit();
        //}

        //[TestMethod]
        //public void Add_Releastic_Truck_Routes()
        //{
        //    NHibernateHelper helper = new NHibernateHelper(_connectionString);

        //    float latStart = 43.0730517f;
        //    float lngStart = -89.4012302f;
        //    DateTime dtStart = DateTime.Now;
        //    float[] lats = {41.850033f, 44.9799654f, 41.6005448f};
        //    float[] lngs = {-87.6500523f, -93.2638361f, -93.6091064f};
        //    float[] numHours = {3.5f, 6.0f, 7.0f};
        //    string[] truckNames = {"Chicago", "Minneapolis", "Des Moines"};
        //    string[] plateNumbers = {"ABC-001", "ABC-002", "ABC-003"};
        //    string[] types = {"Flat Bed", "Dump Truck", "Moving Van"};
        //    string[] firstName = {"Joe", "Sue", "Tom"};
        //    string[] lastName = {"Black", "Pink", "Yellow"};

        //    for(int i=0;i<lats.Length;i++)
        //    {
        //        // Create the truck, driver, and route in memory
        //        //
        //        Truck truck = new Truck
        //                        {
        //                            Name = truckNames[i],
        //                            PlateNumber = plateNumbers[i],
        //                            Type = types[i]
        //                        };
        //        Driver driver = new Driver
        //        {
        //            FirstName = firstName[i],
        //            LastName = lastName[i]
        //        };
        //        truck.AddDriver(driver);

        //        const int numPoints = 100;
        //        float deltaLat = (lats[i] - latStart)/(numPoints - 1);
        //        float deltaLng = (lngs[i] - lngStart)/(numPoints - 1);
        //        float deltaHours = numHours[i]/(numPoints - 1);

        //        for(int j=0;j<numPoints;j++)
        //        {
        //            Location location = new Location
        //                                    {
        //                                        Latitude = latStart + deltaLat*j,
        //                                        Longitude = lngStart + deltaLng*j,
        //                                        Timestamp = dtStart.AddHours(deltaHours * j)
        //                                    };
        //            truck.AddLocation(location);
        //        }

        //        // Add it to the database.
        //        //
        //        UnitOfWork unitOfWork = new UnitOfWork(helper.SessionFactory);
        //        Repository<Truck> repository = new Repository<Truck>(unitOfWork.Session);
        //        repository.Add(truck);
        //        unitOfWork.Commit();
        //    }

        //}

        //private static void AddRandomRoute(int numPoints, DateTime start, DateTime stop, Truck truck)
        //{
        //    const float latStart = 43.1f;
        //    const float longStart = 89.5f;
        //    const float maxChangePerHour = 1.0f;
        //    Random random = new Random(DateTime.Now.Millisecond);

        //    TimeSpan timeSpan = stop - start;
        //    double totalHours = timeSpan.TotalHours;
        //    double hoursPerPoint = totalHours/numPoints;
        //    float maxChangerPerPoint = maxChangePerHour*(float) hoursPerPoint;

        //    maxChangerPerPoint = 1.0f;

        //    float latitude = latStart;
        //    float longitude = longStart;
        //    DateTime timeStamp = start;
        //    for(int i=0;i<numPoints;i++)
        //    {
        //        Location location = new Location
        //                                {
        //                                    Latitude = latitude,
        //                                    Longitude = longitude,
        //                                    Timestamp = timeStamp
        //                                };
        //        truck.AddLocation(location);

        //        // Move the truck
        //        float angle = (float) random.NextDouble()*2.0f*(float)Math.PI;
        //        latitude += maxChangerPerPoint*(float)Math.Cos(angle);

        //        longitude += maxChangerPerPoint*(float) Math.Sin(angle);
        //        timeStamp = timeStamp.AddHours(hoursPerPoint);
        //    }
        //}
    }
}
