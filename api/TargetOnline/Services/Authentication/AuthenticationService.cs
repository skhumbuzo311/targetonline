 using System;
using System.Linq;
using TargetOnline.Context;
using TargetOnline.Entities;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services.Validations.AuthenticationValidation;
using TargetOnline.Services.Utils;
using TargetOnline.Services.Converters;
using Microsoft.AspNetCore.SignalR;

namespace TargetOnline.Services.Authentication
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly string _encryptionKey;
        private readonly DatabaseContext _smartAutoPartsDbContext;
        private readonly IAuthenticationValidationService _authenticationValidation;
        public AuthenticationService(DatabaseContext focusMentorshipDbContext, IAuthenticationValidationService authenticationValidation)
        {
            _smartAutoPartsDbContext = focusMentorshipDbContext;
            _authenticationValidation = authenticationValidation;

            var encryptionKey = _smartAutoPartsDbContext.Configurations.SingleOrDefault(c => c.Name == "Encryption key");
            if (encryptionKey == null) throw new Exception("Encryption key configuration value is missing.");

            _encryptionKey = encryptionKey.Value;
        }

        public IOutcome<Models.User> signup(Models.User user)
        {
            (bool canAction, string error) = _authenticationValidation.CanAddUser(user);
            if (!canAction)
            {
                return new Failure<Models.User>(error);
            }

            var newUser = new User()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                EmailAddress = user.EmailAddress,
                PhoneNumber = user.PhoneNumber,
                Password = Encryption.Encrypt(_encryptionKey, user.Password),
                IsActive = true,
                LastLoggedIn = DateTime.Now,
                CreatedAt = DateTime.Now
            };

            _smartAutoPartsDbContext.Users.Add(newUser);
            _smartAutoPartsDbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(newUser));
        }

        public IOutcome<Models.User> login(Models.User user)
        {
            var dbUser = _smartAutoPartsDbContext.Users.FirstOrDefault(u => u.PhoneNumber.ToLower() == user.PhoneNumber.ToLower());

            (bool canAction, string error) = _authenticationValidation.CanUserLogin(dbUser, user, _encryptionKey);
            if (!canAction)
            {
                return new Failure<Models.User>(error);
            }

            dbUser.LastLoggedIn = DateTime.Now;

            _smartAutoPartsDbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(dbUser));
        }
    }
}
