using TargetOnline.Entities;

namespace TargetOnline.Services.Converters
{
    public static class ShopsConverter
    {
        public static Models.Shop ConvertShopToModel(Shop Shop)
        {
            return new Models.Shop()
            {
                Id = Shop.Id,
                Name = Shop.Name,
                Description = Shop.Description,
                RatePerKM = Shop.RatePerKM,
                BankCode = Shop.BankCode,
                BankName = Shop.BankName,
                EmailAddress = Shop.EmailAddress,
                ShopOwnerName = Shop.CreatedByUser.FirstName,
                AccountNumber = Shop.AccountNumber,
                SubAccountCode = Shop.SubAccountCode,
                Location = new Models.Location()
                {
                    Description = Shop.Location.Description,
                    Latitude  = Shop.Location.Latitude,
                    Longitude = Shop.Location.Longitude
                },
                LogoURL = Shop.LogoURL,
                CreatedAt = Shop.CreatedAt
            };
        }
    }
}
