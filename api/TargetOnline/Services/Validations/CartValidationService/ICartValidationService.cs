namespace TargetOnline.Services.Validations.CartValidations
{
    public interface ICartValidationService
    {
        (bool canAction, string error) CanUpdatePayment(Entities.CartItem dbCartItem);
        (bool canAction, string error) CanAdd(Entities.CartItem cartItem, int autoSpareId);
        (bool canAction, string error) CanUpdate(Entities.CartItem cartItem, int actionedByUserId);
        (bool canAction, string error) CanRemove(Entities.OrderedItem orderedItem, bool isPaymentComplete);
    }
}
