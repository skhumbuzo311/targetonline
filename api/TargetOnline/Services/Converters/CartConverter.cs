using System.Collections.Generic;
using System.Linq;
using TargetOnline.Entities;

namespace TargetOnline.Services.Converters
{
    public static class CartConverter
    {
        public static Models.CartItem ConvertCartItemToModel(CartItem cartItem)
        {
            return new Models.CartItem()
            {
                Id = cartItem.Id,
                OrderId = cartItem.OrderId,
                OrderNumber = cartItem.OrderNumber,
                Status = cartItem.Status.Description,
                ItemsCost = cartItem.OrderedItems.Sum(oi => oi.AutoSpare.Price),
                TotalCost = cartItem.TotalCost,
                DeliveryCost = cartItem.DeliveryCost,
                DeliveryDistance = cartItem.DeliveryDistance,
                CreatedAt = cartItem.CreatedAt,
                //imagesUrls = cartItem.OrderedItems.Where(oi => oi.AutoSpare.Images.Count() > 0).Select(oi => oi.AutoSpare.Images.First().URL),
                //OrderedItems = cartItem.OrderedItems.Select(oi => AutoSparesConverter.ConvertAutoSpareToModel(oi.AutoSpare)),
                DeliveryAddress = cartItem.DeliveryAddress == null ? null : new Models.Location()
                {
                    Id = cartItem.DeliveryAddress.Id,
                    Description = cartItem.DeliveryAddress.Description,
                    Latitude = cartItem.DeliveryAddress.Latitude,
                    Longitude = cartItem.DeliveryAddress.Longitude,
                },
                PickUpAddress = cartItem.PickUpAddress == null ? null : new Models.Location()
                {
                    Id = cartItem.PickUpAddress.Id,
                    Description = cartItem.PickUpAddress.Description,
                    Longitude = cartItem.PickUpAddress.Longitude,
                    Latitude = cartItem.PickUpAddress.Latitude
                },
                TransactionRef = cartItem.TransactionRef,
                IsPaymentComplete = cartItem.IsPaymentComplete,
                CreatedByUserId = cartItem.CreatedByUserId,
                PaymentCompletedAt = cartItem.PaymentCompletedAt,
                CreatedByUser = AuthenticationConverter.ConvertUserToModel(cartItem.CreatedByUser)
            };
        }
    }
}
