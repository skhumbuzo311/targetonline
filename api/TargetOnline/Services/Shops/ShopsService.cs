using TargetOnline.Context;
using TargetOnline.Models;
using ServiceLayer;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services.Utils;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using TargetOnline.Services.Converters;
using Microsoft.EntityFrameworkCore;
using IEmailService = TargetOnline.Services.Emails.IEmailService;
using System.Collections.Generic;

namespace TargetOnline.Services
{
    public class ShopsService : IShopsService
    {
        private string _baseURL = string.Empty;
        private readonly DatabaseContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public ShopsService(DatabaseContext dbContext, IConfiguration configuration, IEmailService emailService)
        {
            _dbContext = dbContext;
            _emailService = emailService;
            _configuration = configuration;
            _baseURL = configuration.GetSection(configuration.GetSection("Environment").Value)["BaseURL"];
        }

        public List<Shop> Get()
        {
            return _dbContext.Shops
                    .Include(s => s.Location)
                    .Include(s => s.CreatedByUser)
                    .OrderByDescending(f => f.CreatedAt)
                    .Select(s => ShopsConverter.ConvertShopToModel(s))
                    .ToList();
        }

        public Shop Get(int shopId)
        {
            var dbShop = _dbContext.Shops
                    .Include(s => s.Location)
                    .Include(s => s.CreatedByUser)
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
                    EmailAddress = httpRequest.Form["emailAddress"],
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

                var dbShop = Get(shop.Id);

                _emailService.SendShopCreationConfirmation(dbShop, _baseURL);

                return new Success<Shop>(dbShop);
            }
            catch (Exception ex)
            {
                return new Failure<Shop>(ex.Message);
            }
        }
    }
}
