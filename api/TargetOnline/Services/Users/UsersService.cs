﻿using System;
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

        public IOutcome<List<User>> Get() => new Success<List<User>>(_DbContext.Users.ToList());

        public async Task<IOutcome<User>> UpdateAvatar(Microsoft.AspNetCore.Http.HttpRequest httpRequest)
        {
            try
            {
                var file = httpRequest.Form.Files[0];
                var hasImage = file != null;
                var currentUserId = int.Parse(httpRequest.Form["createdByUserId"][0]);
                var currentUser = _DbContext.Users.Single(u => u.Id == currentUserId);
                var mimeType = file.ContentType;
                var fileData = await FormFileExtensions.GetBytes(file);

                BlobStorageService objBlobService = new BlobStorageService(_configuration);

                currentUser.HasAvatar = true;
                currentUser.AvatarURL = objBlobService.UploadFileToBlob(currentUser.PhoneNumber, fileData, mimeType);

                _DbContext.Users.Update(currentUser);
                _DbContext.SaveChanges();

                return new Success<User>(currentUser);
            }
            catch (Exception ex)
            {
                return new Failure<User>(ex.Message);
            }
        }

        public IOutcome<User> Update(User user)
        {
            var currentUser = _DbContext.Users.Single(u => u.Id == user.Id);
            currentUser.PhoneNumber = user.PhoneNumber;
            currentUser.Address = user.Address;

            _DbContext.SaveChanges();

            return new Success<User>(currentUser);
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
            var dbUser = _DbContext.Users.FirstOrDefault(u => u.PhoneNumber == user.PhoneNumber);

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
            var dbUser = _DbContext.Users.Single(u => u.Id == user.Id);
            dbUser.Password = Encryption.Encrypt(_encryptionKey, user.Password);

            _DbContext.SaveChanges();

            return new Success<Models.User>(AuthenticationConverter.ConvertUserToModel(dbUser));
        }
    }
}
