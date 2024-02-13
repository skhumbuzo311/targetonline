using TargetOnline.Entities;

namespace TargetOnline.Services.Converters
{
    public static class ProductsConverter
    {
        public static Models.Product ConvertProductToModel(Product product)
        {
            return new Models.Product()
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                WeightKG = product.WeightKG,
                Price = product.Price,
                ImageURL = product.ImageURL,
                Quantity = product.Quantity,
                CreatedAt = product.CreatedAt
            };
        }
    }
}
