using Microsoft.AspNetCore.Mvc;
using TargetOnline.Outcomes;
using TargetOnline.Outcomes.Results;
using TargetOnline.Services;

namespace TargetOnline.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly IHandler _outcomeHandler;
        private readonly ICartService _cartService;
        public CartController(ICartService cartService, IHandler outcomeHandler)
        {
            _cartService = cartService;
            _outcomeHandler = outcomeHandler;
        }

        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_cartService.Get());
        }

        [HttpGet("{id}")]
        public ActionResult GetCartItem(int id)
        {
            return Ok(_cartService.GetCartItem(id));
        }

        [HttpPatch("delivery-details")]
        public ActionResult<IOutcome<Models.CartItem>> UpdateDeliveryDetails(Models.CartItem cartItem)
        {
            return _outcomeHandler.HandleOutcome(_cartService.UpdateDeliveryDetails(cartItem));
        }

        [HttpPost("userId/{userId}")]
        public ActionResult<IOutcome<Models.CartItem>> CreateCartItem(Models.Product autoSpare, int UserId)
        {
            return _outcomeHandler.HandleOutcome(_cartService.Add(autoSpare, UserId));
        }

        [HttpDelete("autoSpare/{autoSpareId}/user/{userId}")]
        public ActionResult<IOutcome<Models.CartItem>> RemoveItem(int autoSpareId, int UserId)
        {
            return _outcomeHandler.HandleOutcome(_cartService.Remove(autoSpareId, UserId));
        }

        [HttpPatch("update-payment")]
        public ActionResult<IOutcome<Models.CartItem>> UpdatePayment(Models.CartItem cartItem)
        {
            return _outcomeHandler.HandleOutcome(_cartService.UpdatePayment(cartItem));
        }
    }
}
