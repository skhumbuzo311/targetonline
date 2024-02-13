using System;
using System.Linq;
using System.Threading.Tasks;
using TargetOnline.Entities;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services.Utils;
using ServiceLayer;
using Microsoft.Extensions.Configuration;
using TargetOnline.Services.Validations.SettingsValidation;
using TargetOnline.Services.Converters;
using TargetOnline.Services.Emails;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TargetOnline.Services.Settings
{
    public class UsersService : IUsersService
    {

        private readonly string _encryptionKey;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly Context.DatabaseContext _DbContext;
        private readonly ISettingsValidationService _settingsValidationService;

        public UsersService(Context.DatabaseContext dbContext, IConfiguration configuration, ISettingsValidationService settingsValidationService, IEmailService emailService)
        {
            _emailService = emailService;
            _configuration = configuration;
            _DbContext = dbContext;
            _settingsValidationService = settingsValidationService;

            var encryptionKey = _DbContext.Configurations.SingleOrDefault(c => c.Name == "Encryption key");
            if (encryptionKey == null) throw new Exception("Encryption key configuration value is missing.");

            _encryptionKey = encryptionKey.Value;
        }

        public IOutcome<List<Models.User>> Get() => new Success<List<Models.User>>(_DbContext.Users
                .Include(ci => ci.Location)
            .Select(u => AuthenticationConverter.ConvertUserToModel(u))
            .ToList());

        public async Task<IOutcome<Models.User>> UpdateAvatar(Microsoft.AspNetCore.Http.HttpRequest httpRequest)
        {
            try
            {
                var file = httpRequest.Form.Files[0];
                var hasImage = file != null;
                var currentUserId = int.Parse(httpRequest.Form["createdByUserId"][0]);
                var currentUser = _DbContext.Users
                .Include(ci => ci.Location)
                .Single(u => u.Id == currentUserId);
                var mimeType = file.ContentType;
                var fileData = await FormFileExtensions.GetBytes(file);

                BlobStorageService objBlobService = new BlobStorageService(_configuration);

                currentUser.HasAvatar = true;
                currentUser.AvatarURL = objBlobService.UploadFileToBlob(currentUser.PhoneNumber, fileData, mimeType);

                _DbContext.Users.Update(currentUser);
                _DbContext.SaveChanges();

                return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(currentUser));
            }
            catch (Exception ex)
            {
                return new Failure<Models.User>(ex.Message);
            }
        }

        public IOutcome<Models.User> Update(User user)
        {
            var currentUser = _DbContext.Users
                .Include(ci => ci.Location)
                .Single(u => u.Id == user.Id);

            currentUser.PhoneNumber = user.PhoneNumber;
            currentUser.FirstName = user.FirstName;
            currentUser.LastName = user.LastName;
            currentUser.Password = user.Password == currentUser.Password ? currentUser.Password : Encryption.Encrypt(_encryptionKey, user.Password);


            _DbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(currentUser));
        }

        public IOutcome<User> GetUser(string encryptedPassword)
        {
            return new Success<User>(
                _DbContext.Users.OrderByDescending(d => d.LastLoggedIn).FirstOrDefault(
                    u => u.Password.Replace("/", string.Empty).Replace("+", string.Empty) == encryptedPassword)
            );
        }

        public IOutcome<Models.User> PasswordResetRequest(Models.User user)
        {
            var dbUser = _DbContext.Users
                .Include(ci => ci.Location)
                .FirstOrDefault(u => u.PhoneNumber == user.PhoneNumber);

            (bool canAction, string error) = _settingsValidationService.CanResetPassword(dbUser, user);
            if (!canAction)
            {
                return new Failure<Models.User>(error);
            }

            _emailService.SendEmail(new Models.EmailData
            {
                EmailSubject = "Password Reset Request",
                EmailToName = dbUser.FirstName,
                EmailToId = dbUser.EmailAddress,
                EncryptedPassword = dbUser.Password.Replace("/", string.Empty).Replace("+", string.Empty),
            });

            _DbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(dbUser));
        }

        public IOutcome<Models.User> ResetPassword(Models.User user)
        {
            var dbUser = _DbContext.Users
                .Include(ci => ci.Location)
                .Single(u => u.Id == user.Id);
            dbUser.Password = Encryption.Encrypt(_encryptionKey, user.Password);

            _DbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(dbUser));
        }

        public IOutcome<Models.User> UpdateLocation(Models.User user)
        {
            var dbUser = _DbContext.Users
                .Include(ci => ci.Location)
                .Single(u => u.Id == user.Id);

            dbUser.Location = new Location()
            {
                Description = user.Location.Description,
                Latitude = user.Location.Latitude,
                Longitude = user.Location.Longitude
            };

            _DbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(dbUser));
        }
    }
}
