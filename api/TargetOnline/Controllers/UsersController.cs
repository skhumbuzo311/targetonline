using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TargetOnline.Entities;
using TargetOnline.Outcomes;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services.Settings;
using System.Collections.Generic;
using TargetOnline.Models.HttpResponses;
using TargetOnline.Models.HttpRequests;
using Microsoft.AspNetCore.Http;

namespace TargetOnline.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IHandler _outcomeHandler;
        private readonly IUsersService _usersService;
        public UsersController(IUsersService settingsService, IHandler outcomeHandler)
        {
            _outcomeHandler = outcomeHandler;
            _usersService = settingsService;
        }

        [HttpGet]
        public ActionResult<IOutcome<List<User>>> Get()
        {
            return _outcomeHandler.HandleOutcome(_usersService.Get()); ;
        }

        [HttpGet("user/{encryptedPassword}")]
        public ActionResult<IOutcome<User>> GetUser(string encryptedPassword)
        {
            return _outcomeHandler.HandleOutcome(_usersService.GetUser(encryptedPassword)); ;
        }

        [HttpPatch]
        public ActionResult<IOutcome<User>> Update(User user)
        {
            return _outcomeHandler.HandleOutcome(_usersService.Update(user)); ;
        }

        [HttpPut("update-avatar")]
        public async Task<ActionResult<IOutcome<User>>> UpdateAvatar(IFormFile formFile)
        {
            return _outcomeHandler.HandleOutcome(await _usersService.UpdateAvatar(Request)); ;
        }

        [HttpPut("password-reset-request")]
        public ActionResult<IOutcome<Models.User>> PasswordResetRequest(Models.User user)
        {
            return _outcomeHandler.HandleOutcome(_usersService.PasswordResetRequest(user)); ;
        }

        [HttpPut("reset-password")]
        public ActionResult<IOutcome<Models.User>> ResetPassword(Models.User user)
        {
            return _outcomeHandler.HandleOutcome(_usersService.ResetPassword(user)); ;
        }
    }
}
