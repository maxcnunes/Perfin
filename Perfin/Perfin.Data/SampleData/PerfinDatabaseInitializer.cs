using Perfin.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace Perfin.Data.SampleData
{ 
    public class PerfinDatabaseInitializer :
        //CreateDatabaseIfNotExists<PerfinDbContext>        // when model is stable
        DropCreateDatabaseIfModelChanges<PerfinDbContext> // when iterating
    {

        protected override void Seed(PerfinDbContext context)
        {
            // Seed code here
            var users = AddUsers(context);
        }

        /*
         * FAKE DATA GENERATE
         */

        private List<User> AddUsers(PerfinDbContext context)
        {
            var names = new[] { 
                "Maria", "Pedro", "John", "Jake", "Max", "Philips", 
                "Rafael", "Jack", "Daniel", "Danilo", "Bete", "Clo", 
                "Boris", "Joao", "Mauricio", "Mariana", "Roberta", "Leticia"
            };

            var users = new List<User>();
            Array.ForEach(names, name =>
                {
                    var item = new User {Name = name};
                    users.Add(item);
                    context.Users.Add(item);
                });

            context.SaveChanges();
            return users;
        }
    }
}