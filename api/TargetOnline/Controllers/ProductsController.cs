using TargetOnline.Models;
using TargetOnline.Outcomes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services.Products;

namespace api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductsService _productsService;
    private readonly IHandler _handler;

    public ProductsController(IProductsService productsService, IHandler handler)
    {
        _productsService = productsService;
        _handler = handler;
    }

    [HttpGet]
    public List<Product> GetProducts()
    {
        return _productsService.GetProducts();
    }

    [HttpPost]
    public async Task<ActionResult<IOutcome<Product>>> AddProduct()
    {
        return _handler.HandleOutcome(await _productsService.AddProduct(Request));
    }

    [HttpDelete("{productId}")]
    public Product Delete(int productId)
    {
        return _productsService.Delete(productId);
    }
}




