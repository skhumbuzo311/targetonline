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
        IOutcome<List<User>> Get();
        IOutcome<User> Update(User user);
        IOutcome<User> GetUser(string encryptedPassword);
        IOutcome<Models.User> ResetPassword(Models.User user);
        Task<IOutcome<User>> UpdateAvatar(HttpRequest httpRequest);
        IOutcome<Models.User> PasswordResetRequest(Models.User user);
    }
}
