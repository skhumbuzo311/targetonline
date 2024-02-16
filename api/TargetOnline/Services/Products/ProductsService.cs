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
using TargetOnline.Services.Emails;

namespace TargetOnline.Services.Products
{
    public class ProductsService : IProductsService
    {
        private string _baseURL = string.Empty;
        private readonly DatabaseContext _dbContext;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;
        public ProductsService(DatabaseContext dbContext, IConfiguration configuration, IEmailService emailService)
        {
            _dbContext = dbContext;
            _emailService = emailService;
            _configuration = configuration;
            _emailService = emailService;
            _baseURL = configuration.GetSection("Environment")["BaseURL"];
        }

        public List<Product> GetProducts()
        {
            return _dbContext.Products
                .Include(p => p.Shop)
                .Include(p => p.CreatedByUser)
                .Select(p => ProductsConverter.ConvertProductToModel(p))
                .ToList();
        }

        public Product GetProduct(int id)
        {
            var dbProduct = _dbContext.Products
                .Include(p => p.Shop)
                .Include(p => p.CreatedByUser)
                .Single(p => p.Id == id);

            return ProductsConverter.ConvertProductToModel(dbProduct);
        }

        public Product Delete(int productId)
        {
            var dbProduct = _dbContext.Products.Single(p => p.Id == productId);
            dbProduct.IsDeleted = true;
           
            _dbContext.SaveChanges();

            return ProductsConverter.ConvertProductToModel(dbProduct);
        }

        public async Task<IOutcome<Product>> AddProduct(HttpRequest httpRequest)
        {
            try
            {
                var file = httpRequest.Form.Files[0];

                var mimeType = file.ContentType;
                var fileData = await FormFileExtensions.GetBytes(file);

                BlobStorageService objBlobService = new BlobStorageService(_configuration);

                var imageUrl = objBlobService.UploadFileToBlob(file.FileName, fileData, mimeType);

                var product = new Entities.Product()
                {
                    Price = Convert.ToInt32(httpRequest.Form["price"]),
                    Name = httpRequest.Form["name"].ToString(),
                    WeightKG = Convert.ToInt32(httpRequest.Form["weightKG"]),
                    Description = httpRequest.Form["description"].ToString(),
                    ImageURL = imageUrl,
                    CreatedAt = DateTime.Now,
                };

                _dbContext.Add(product);
                _dbContext.SaveChanges();

                var dbProduct = GetProduct(product.Id);

                _emailService.SendProductCreationConfirmation(dbProduct, _baseURL);

                return new Success<Product>(ProductsConverter.ConvertProductToModel(product));
            }
            catch (Exception ex)
            {
                return new Failure<Product>(ex.Message);
            }
        }
    }
}
