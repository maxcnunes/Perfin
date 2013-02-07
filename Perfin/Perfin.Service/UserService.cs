using Perfin.Common.Exceptions;
using Perfin.Common.Violation;
using Perfin.Data.Contract;
using Perfin.Model;
using Perfin.Service.Contract;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Perfin.Service
{
    public class UserService : Service<User>, IUserService
    {
        IEnumerable<RuleViolation> RuleViolations { get; set; }

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

        public void Register(string login, string password, string passwordConfirm)
        {
            if (!IsValidToRegister(login, password, passwordConfirm))
                throw new BusinessRuleViolationException(RuleViolations);

            var user = new User(login, password);

            try
            {
                _repository.Add(user);
            }
            catch (Exception)
            {
                throw;
            }
        }

        /*
         * Validations
         */

        public bool IsValidToRegister(string login, string password, string passwordConfirm)
        {
            RuleViolations = GetRuleViolationsToRegister(login, password, passwordConfirm);
            return !RuleViolations.Any();
        }

        public IEnumerable<RuleViolation> GetRuleViolationsToRegister(string login, string password, string passwordConfirm)
        {
            if (String.IsNullOrEmpty(login))
                yield return new RuleViolation("Login required", "Login", login);

            if (String.IsNullOrEmpty(password))
                yield return new RuleViolation("Password required", "Password", password);

            if (String.IsNullOrEmpty(passwordConfirm))
                yield return new RuleViolation("Password Confirmation required", "Password Confirmation", passwordConfirm);

            if (!String.IsNullOrEmpty(password) && !String.IsNullOrEmpty(passwordConfirm) && !String.Equals(password, passwordConfirm))
                yield return new RuleViolation("Password Confirmation not match with the first password", "Password Confirmation", passwordConfirm);

            yield break;
        }
    }
}