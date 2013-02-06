using Perfin.Data.Contract;
using Perfin.Model;
using Perfin.Service.Contract;
using System;

namespace Perfin.Service
{
    public class UserService : Service<User>, IUserService
    {
        public UserService(IUserRepository repository)
            : base(repository) { }

        public bool LoginIsAvailable(string login)
        {
            return ((IUserRepository)_repository).GetByLogin(login) != null;
        }

        public bool Authenticate(string login, string password)
        {
            var user = ((IUserRepository)_repository).GetByLogin(login);
            if (user == null)
                return false;

            return user.VerifyPasswordMatch(password);
        }

        public void ChangePassword(string oldPassword, string newPassword)
        {
            throw new NotImplementedException();
        }

        //public override IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        //{
        //    if (string.IsNullOrEmpty(Name))
        //    {
        //        yield return new ValidationResult("Name is mandatory", new[] { "Name" });
        //    }
        //    if (EndTime.HasValue)
        //    {
        //        if (StartTime > EndTime.Value)
        //        {
        //            yield return new ValidationResult("EndTime must be after the StartTime", new[] { "StartTime", "EndTime" });
        //        }
        //    }
        //}
    }
}
