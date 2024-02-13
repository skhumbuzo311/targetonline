using System.Collections.Generic;
using TargetOnline.Entities;
using TargetOnline.Outcomes.Results;

namespace TargetOnline.Services
{
    public interface ICartService
    {
        IEnumerable<Models.CartItem> Get();
        Models.CartItem GetCartItem(int CartItemId);
        IOutcome<Models.CartItem> Remove(int autoSpareId, int UserId);
        //IOutcome<Models.CartItem> InAppPayment(Models.CartItem cartItem);
        IOutcome<Models.CartItem> UpdatePayment(Models.CartItem cartItem);
        IOutcome<Models.CartItem> Add(Models.Product autoSpare, int UserId);
        IOutcome<Models.CartItem> UpdateDeliveryDetails(Models.CartItem cartItem);
    }
}
