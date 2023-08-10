using TargetOnline.Models;

namespace TargetOnline.Services.Validations.SettingsValidation
{
    public interface ISettingsValidationService
    {
        (bool canAction, string error) CanResetPassword(Entities.User dbUser, User user);
    }
}
