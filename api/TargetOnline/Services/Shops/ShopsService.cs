using TargetOnline.Context;
using TargetOnline.Models;
using ServiceLayer;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using TargetOnline.Services.Converters;
using Microsoft.EntityFrameworkCore;

namespace TargetOnline.Services
{
    public class ShopsService : IShopsService
    {
        private readonly DatabaseContext _dbContext;
        private readonly IConfiguration _configuration;
        public ShopsService(DatabaseContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public Shop Get(int shopId)
        {
            var dbShop = _dbContext.Shops
                    .Include(ci => ci.Location)
                    .OrderByDescending(f => f.CreatedAt)
                    .Single(s => s.Id == shopId);

             return ShopsConverter.ConvertShopToModel(dbShop);
        }

        public async Task<IOutcome<Shop>> Create(HttpRequest httpRequest)
        {
            try
            {
                var file = httpRequest.Form.Files[0];

                var mimeType = file.ContentType;
                var fileData = await FormFileExtensions.GetBytes(file);

                BlobStorageService objBlobService = new BlobStorageService(_configuration);

                var imageUrl = objBlobService.UploadFileToBlob(file.FileName, fileData, mimeType);

                var shop = new Entities.Shop()
                {
                    Name = httpRequest.Form["name"].ToString(),
                    Description = httpRequest.Form["description"].ToString(),
                    RatePerKM = Convert.ToInt32(httpRequest.Form["ratePerKM"]),
                    BankName = httpRequest.Form["bankName"].ToString(),
                    BankCode = httpRequest.Form["bankCode"].ToString(),
                    AccountNumber = httpRequest.Form["accountNumber"],
                    CreatedByUserId = Convert.ToInt32(httpRequest.Form["currentUserId"]),
                    SubAccountCode = httpRequest.Form["subAccountCode"].ToString(),
                    Location = new Entities.Location()
                    {
                        Description = httpRequest.Form["locationDescription"].ToString(),
                        Latitude = Convert.ToDecimal(httpRequest.Form["locationLatitude"]),
                        Longitude = Convert.ToDecimal(httpRequest.Form["locationLongitude"])
                    },
                    LogoURL = imageUrl,
                    CreatedAt = DateTime.Now
                };

                _dbContext.Add(shop);
                _dbContext.SaveChanges();

                return new Success<Shop>(ShopsConverter.ConvertShopToModel(shop));
            }
            catch (Exception ex)
            {
                return new Failure<Shop>(ex.Message);
            }
        }
    }
}
