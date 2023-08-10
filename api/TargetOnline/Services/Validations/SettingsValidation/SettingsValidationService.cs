using System.Text.RegularExpressions;
using TargetOnline.Entities;
using TargetOnline.Services.Utils;

namespace TargetOnline.Services.Validations.SettingsValidation
{
    public class SettingsValidationService : ISettingsValidationService
    {
        public (bool canAction, string error) CanResetPassword(User dbUser, Models.User user)
        {
            if (!new Regex(Constants.PhoneNumberValidationRegex).IsMatch(user.PhoneNumber))
            {
                return (false, "Please enter a valid phone number.");
            }

            if (dbUser == null)
            {
                return (false, $"No user exists with phone number {user.PhoneNumber}");
            }

            return (true, string.Empty);
        }
    }
}
