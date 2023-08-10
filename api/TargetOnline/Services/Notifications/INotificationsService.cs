using System.Collections.Generic;
using TargetOnline.Entities;
using TargetOnline.Outcomes.Results;

namespace TargetOnline.Services.Settings
{
    public interface INotificationsService
    {
        IOutcome UpdateUserExpoPushToken(User user);
        List<string> GetAdminsExpoPushTokens();
    }
}
