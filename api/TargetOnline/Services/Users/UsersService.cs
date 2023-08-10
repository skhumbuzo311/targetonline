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

namespace TargetOnline.Services.Settings
{
    public class UsersService : IUsersService
    {

        private readonly string _encryptionKey;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        private readonly Context.DatabaseContext _smartAutoPartsDbContext;
        private readonly ISettingsValidationService _settingsValidationService;

        public UsersService(Context.DatabaseContext smartAutoPartsDbContext, IConfiguration configuration, ISettingsValidationService settingsValidationService, IEmailService emailService)
        {
            _emailService = emailService;
            _configuration = configuration;
            _smartAutoPartsDbContext = smartAutoPartsDbContext;
            _settingsValidationService = settingsValidationService;

            var encryptionKey = _smartAutoPartsDbContext.Configurations.SingleOrDefault(c => c.Name == "Encryption key");
            if (encryptionKey == null) throw new Exception("Encryption key configuration value is missing.");

            _encryptionKey = encryptionKey.Value;
        }

        public IOutcome<List<User>> Get() => new Success<List<User>>(_smartAutoPartsDbContext.Users.ToList());

        public async Task<IOutcome<User>> UpdateAvatar(Microsoft.AspNetCore.Http.HttpRequest httpRequest)
        {
            var file = httpRequest.Form.Files[0];
            var hasImage = file != null;
            var imageHeight = httpRequest.Form["imageHeight"][0];
            var imageWidth = httpRequest.Form["imageWidth"][0];
            var currentUserId = int.Parse(httpRequest.Form["createdByUserId"][0]);
            var currentUser = _smartAutoPartsDbContext.Users.Single(u => u.Id == currentUserId);
            var mimeType = file.ContentType;
            var fileData = await FormFileExtensions.GetBytes(file);
     
            BlobStorageService objBlobService = new BlobStorageService(_configuration);

            currentUser.HasAvatar = true;
            currentUser.ImageWidth = hasImage ? int.Parse(imageWidth) : 0;
            currentUser.ImageHeight = hasImage ? int.Parse(imageHeight) : 0;
            currentUser.AvatarURL = objBlobService.UploadFileToBlob(currentUser.PhoneNumber, fileData, mimeType);

            _smartAutoPartsDbContext.Users.Update(currentUser);
            _smartAutoPartsDbContext.SaveChanges();

            return new Success<User>(currentUser);
        }

        public IOutcome<User> Update(User user)
        {
            var currentUser = _smartAutoPartsDbContext.Users.Single(u => u.Id == user.Id);
            currentUser.PhoneNumber = user.PhoneNumber;
            currentUser.Address = user.Address;

            _smartAutoPartsDbContext.SaveChanges();

            return new Success<User>(currentUser);
        }

        public IOutcome<User> GetUser(string encryptedPassword)
        {
            return new Success<User>(
                _smartAutoPartsDbContext.Users.OrderByDescending(d => d.LastLoggedIn).FirstOrDefault(
                    u => u.Password.Replace("/", string.Empty).Replace("+", string.Empty) == encryptedPassword)
            );
        }

        public IOutcome<Models.User> PasswordResetRequest(Models.User user)
        {
            var dbUser = _smartAutoPartsDbContext.Users.FirstOrDefault(u => u.PhoneNumber == user.PhoneNumber);

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

            _smartAutoPartsDbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(dbUser));
        }

        public IOutcome<Models.User> ResetPassword(Models.User user)
        {
            var dbUser = _smartAutoPartsDbContext.Users.Single(u => u.Id == user.Id);
            dbUser.Password = Encryption.Encrypt(_encryptionKey, user.Password);

            _smartAutoPartsDbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(dbUser));
        }
    }
}
