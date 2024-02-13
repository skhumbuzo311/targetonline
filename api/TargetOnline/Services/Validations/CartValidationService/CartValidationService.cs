using System.Linq;
using TargetOnline.Context;

namespace TargetOnline.Services.Validations.CartValidations
{
    public class CartValidationService : ICartValidationService
    {
        private readonly DatabaseContext _dbContext;

        public CartValidationService(DatabaseContext smartAutoSparesDbContext)
        {
            _dbContext = smartAutoSparesDbContext;
        }

        public (bool canAction, string error) CanAdd(Entities.CartItem cartItem, int autoSpareId)
        {
            if (cartItem != null && _dbContext.OrderedItems.Any(oi => oi.CartItemId == cartItem.Id && oi.AutoSpareId == autoSpareId))
            {
                return (false, "Item already added");
            }

            return (true, string.Empty);
        }

        public (bool canAction, string error) CanRemove(Entities.OrderedItem orderedItem, bool IsPaymentComplete)
        {
            if (orderedItem == null)
            {
                return (false, $"Item is not part of your ative cart");
            }

            if (IsPaymentComplete)
            {
                return (false, $"Cannot remove an item on cart that has been paid");
            }

            return (true, string.Empty);
        }

        public (bool canAction, string error) CanUpdate(Entities.CartItem dbCartItem, int actionedByUserId)
        {
            if (dbCartItem == null) return (false, $"You do not have an active cart item");
            if(dbCartItem.CreatedByUserId != actionedByUserId) return (false, $"You not the owner therefore not allowed to update");

            return (true, string.Empty);
        }

        public (bool canAction, string error) CanUpdatePayment(Entities.CartItem dbCartItem)
        {
            if (dbCartItem == null) return (false, $"You do not have an active cart item");
            if (dbCartItem.TransactionRefId  != null && dbCartItem.TransactionRef.Status == "success") return (false, $"Payment for this item has already been completed");

            return (true, string.Empty);
        }
    }
}
