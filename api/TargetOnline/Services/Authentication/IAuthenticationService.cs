
using TargetOnline.Models;
using TargetOnline.Outcomes.Results;

namespace TargetOnline.Services.Authentication
{
    public interface IAuthenticationService
    {
        IOutcome<User> login(User user);
        IOutcome<SignupResponse> signup(User user);
    }
}
