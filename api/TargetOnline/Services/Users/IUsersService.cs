using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using TargetOnline.Entities;
using TargetOnline.Models.HttpRequests;
using TargetOnline.Models.HttpResponses;
using TargetOnline.Outcomes.Results;

namespace TargetOnline.Services.Settings
{
    public interface IUsersService
    {
        IOutcome<List<Models.User>> Get();
        IOutcome<Models.User> Update(User user);
        IOutcome<User> GetUser(string encryptedPassword);
        IOutcome<Models.User> ResetPassword(Models.User user);
        Task<IOutcome<Models.User>> UpdateAvatar(HttpRequest httpRequest);
        IOutcome<Models.User> PasswordResetRequest(Models.User user);
        IOutcome<Models.User> UpdateLocation(Models.User user);
    }
}
