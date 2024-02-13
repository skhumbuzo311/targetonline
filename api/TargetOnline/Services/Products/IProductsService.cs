using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using TargetOnline.Models;
using TargetOnline.Outcomes.Results;

namespace TargetOnline.Services.Products
{
    public interface IProductsService
    {
        Task<IOutcome<Product>> AddProduct(HttpRequest httpRequest);

        List<Product> GetProducts();
        Product Delete(int productId);
    }
}
