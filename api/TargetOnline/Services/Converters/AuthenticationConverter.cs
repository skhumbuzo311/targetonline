﻿using TargetOnline.Entities;

namespace TargetOnline.Services.Converters
{
    public static class AuthenticationConverter
    {
        public static Models.User ConvertUserToModel(User user)
        {
            return new Models.User()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Address = user.Address,
                EmailAddress = user.EmailAddress,
                Password = user.Password,
                IsActive = user.IsActive,
                IsEmailVerified = user.IsEmailVerified,
                IsPhoneNumberVerified = user.IsPhoneNumberVerified,
                IsAdmin = user.IsAdmin,
                IsPasswordEncrypted = true,
                AvatarURL = user.AvatarURL,
                HasAvatar = user.HasAvatar,
                LastLoggedIn = user.LastLoggedIn,
                ExpoPushToken = user.ExpoPushToken,
                Income = user.Income,
                Projects = user.Projects,
                Customers = user.Customers,
                CreatedAt = user.CreatedAt
            };
        }
    }
}
