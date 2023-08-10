using TargetOnline.Models;

namespace TargetOnline.Services.Validations.AuthenticationValidation
{
    public interface IAuthenticationValidationService
    {
        (bool canAction, string error) CanAddUser(User user);
        (bool canAction, string error) CanUserLogin(Entities.User dbUser, User user, string encryptionKey);
    }
}
