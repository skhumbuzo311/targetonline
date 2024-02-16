using TargetOnline.Models;

namespace TargetOnline.Services.Emails
{
    public interface IEmailService
    {
        bool SendShopCreationConfirmation(Shop shop, string baseURL);
        bool SendProductCreationConfirmation(Product product, string baseURL);
    }
}
