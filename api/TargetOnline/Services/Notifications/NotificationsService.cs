using System.Linq;
using TargetOnline.Context;
using TargetOnline.Entities;
using TargetOnline.Outcomes.Results;
using System;
using System.Collections.Generic;

namespace TargetOnline.Services.Settings
{
    public class NotificationsService : INotificationsService
    {
        private readonly DatabaseContext _smartAutoSparesDbContext;

        public NotificationsService(DatabaseContext focusMentorshipDbContext)
        {
            _smartAutoSparesDbContext = focusMentorshipDbContext;
        }

        public IOutcome UpdateUserExpoPushToken(User user)
        {
            try
            {
                var currentUser = _smartAutoSparesDbContext.Users.Single(u => u.Id == user.Id);
                currentUser.ExpoPushToken = user.ExpoPushToken;

                _smartAutoSparesDbContext.SaveChanges();

                return new Success();
            }
            catch (Exception ex)
            {
                return new Failure(ex.Message);
            }
        }

        public List<string> GetAdminsExpoPushTokens() => _smartAutoSparesDbContext
            .Users
            .Where(u => u.IsAdmin)
            .Select(u => u.ExpoPushToken)
            .ToList();
    }
}
