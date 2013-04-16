using Perfin.Common;
using Perfin.Common.Helper;

namespace Perfin.Model
{
    public class User
    {
        public virtual int Id { get; set; }
        public virtual string Login { get; set; }
        public virtual string Password { get; set; }
        public virtual string Email { get; set; }
        public virtual string Name { get; set; }
        public virtual string Salt { get; set; }

        public User() { }
        public User(string login, string password)
        {
            Check.Argument.NotNullOrEmpty(login, "login");
            Check.Argument.NotNullOrEmpty(password, "password");

            Login = login;
            Password = password;
        }

        public virtual void CryptographPasswordAndGenerateSalt()
        {
            Check.Argument.NotNullOrEmpty(Password, "Password");

            string salt = string.Empty;
            Password = CryptographyHelper.EncryptPassword(Password, out salt);
            Salt = salt;
        }

        public virtual bool VerifyPasswordMatch(string password)
        {
            Check.Argument.NotNullOrEmpty(password, "password");

            var cryptPassword = CryptographyHelper.CreatePasswordHash(Salt, password);
            return string.Equals(Password, cryptPassword);
        }

        public override string ToString()
        {
            return Name;
        }
    }
}
