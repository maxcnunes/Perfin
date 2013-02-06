using Perfin.Model;


namespace Perfin.Service.Contract
{
    public interface IUserService : IService<User>
    {
        bool LoginIsAvailable(string login);
        bool Authenticate(string login, string password);
        void ChangePassword(string oldPassword, string newPassword);
    }
}
