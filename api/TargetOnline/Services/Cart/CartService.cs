using System.Collections.Generic;
using System.Linq;
using TargetOnline.Context;
using TargetOnline.Entities;
using Microsoft.EntityFrameworkCore;
using TargetOnline.Outcomes.Results;
using System.Threading.Tasks;
using System;
using TargetOnline.Services.Converters;
using TargetOnline.Services.Validations.CartValidations;

namespace TargetOnline.Services
{
    public class CartService : ICartService
    {
        private readonly DatabaseContext _dbContext;
        private readonly ICartValidationService _cartValidationService;

        public CartService(DatabaseContext smartAutoSparesDbContext, ICartValidationService cartValidationService)
        {
            _cartValidationService = cartValidationService;
            _dbContext = smartAutoSparesDbContext;
        }

        public IEnumerable<Models.CartItem> Get()
        {
            return _dbContext.CartItems
                    .Include(ci => ci.Status)
                    .Include(ci => ci.CreatedByUser)
                    .Include(ci => ci.PickUpAddress)
                    .Include(ci => ci.TransactionRef)
                    .Include(ci => ci.DeliveryAddress)
                    .Include(ci => ci.OrderedItems)
                        .ThenInclude(oi => oi.AutoSpare)
                            //.ThenInclude(s => s.Images)
                    .OrderByDescending(f => f.CreatedAt)
                    .Where(ci => ci.OrderedItems.Any())
                    .Select(ci => CartConverter.ConvertCartItemToModel(ci))
                    .ToList();
        }

        public Models.CartItem GetCartItem(int CartItemId)
        {
            var cartItem = _dbContext.CartItems
                    .Include(ci => ci.Status)
                    .Include(ci => ci.CreatedByUser)
                    .Include(ci => ci.OrderedItems)
                    .Include(ci => ci.PickUpAddress)
                    .Include(ci => ci.TransactionRef)
                    .Include(ci => ci.DeliveryAddress)
                    .Include(ci => ci.OrderedItems)
                        .ThenInclude(oi => oi.AutoSpare)
                            //.ThenInclude(s => s.Images)
                    .OrderByDescending(f => f.CreatedAt)
                    .Where(ci => ci.OrderedItems.Any())
                    .SingleOrDefault(b => b.Id == CartItemId);

            return cartItem == null ? new Models.CartItem() : CartConverter.ConvertCartItemToModel(cartItem);
        }

        public IOutcome<Models.CartItem> Add(Models.Product autoSpare, int UserId)
        {
            var activeCartItem = _dbContext.CartItems.SingleOrDefault(ci => !ci.IsPaymentComplete && ci.CreatedByUserId == UserId);

            (bool canAction, string error) = _cartValidationService.CanAdd(activeCartItem, autoSpare.Id);
            if (!canAction)
            {
                return new Failure<Models.CartItem>(error);
            }

            if (activeCartItem == null)
            {
                activeCartItem = new CartItem()
                {
                    CreatedByUserId = UserId,
                    StatusId = _dbContext.Statuses.Single(s => s.Description == "Awaiting Payment").Id,
                    TotalCost = autoSpare.Price,
                    CreatedAt = DateTime.Now
                };

                _dbContext.CartItems.Add(activeCartItem);
                _dbContext.SaveChanges();

                _dbContext.OrderedItems.Add(new OrderedItem
                {
                    CartItemId = activeCartItem.Id,
                    AutoSpareId = autoSpare.Id,
                });
            }
            else
            {
                _dbContext.OrderedItems.Add(new OrderedItem
                {
                    CartItemId = activeCartItem.Id,
                    AutoSpareId = autoSpare.Id,
                });

                activeCartItem.TotalCost = activeCartItem.TotalCost + autoSpare.Price;                
            }

            _dbContext.SaveChanges();

            return new Success<Models.CartItem>(GetCartItem(activeCartItem.Id));
        }

        public IOutcome<Models.CartItem> Remove(int autoSpareId, int UserId)
        {
            var activeCartItem = _dbContext.CartItems.SingleOrDefault(ci => !ci.IsPaymentComplete && ci.CreatedByUserId == UserId);
            var orderedItem = _dbContext
                .OrderedItems
                .Include(oi => oi.AutoSpare)
                .SingleOrDefault(oi => oi.CartItemId == activeCartItem.Id && oi.AutoSpareId == autoSpareId);

            (bool canAction, string error) = _cartValidationService.CanRemove(orderedItem, activeCartItem.IsPaymentComplete);
            if (!canAction)
            {
                return new Failure<Models.CartItem>(error);
            }

            _dbContext.OrderedItems.Remove(orderedItem);

            activeCartItem.ItemsCost -= orderedItem.AutoSpare.Price;
            activeCartItem.TotalCost -= orderedItem.AutoSpare.Price;

            _dbContext.SaveChanges();

            return new Success<Models.CartItem>(GetCartItem(activeCartItem.Id));
        }

        public IOutcome<Models.CartItem> UpdateDeliveryDetails(Models.CartItem cartItem)
        {
            var dbCartItem = _dbContext.CartItems.SingleOrDefault(ci => ci.Id == cartItem.Id);

            (bool canAction, string error) = _cartValidationService.CanUpdate(dbCartItem, cartItem.UpdatedByUserId);
            if (!canAction)
            {
                return new Failure<Models.CartItem>(error);
            }


            dbCartItem.PickUpAddressId = cartItem.PickUpAddressId;
            dbCartItem.DeliveryAddress = new Location()
            {
                Description = cartItem.DeliveryAddress.Description,
                Latitude = cartItem.DeliveryAddress.Latitude,
                Longitude = cartItem.DeliveryAddress.Longitude
            };
            dbCartItem.DeliveryCost = cartItem.DeliveryCost;
            dbCartItem.DeliveryDistance = cartItem.DeliveryDistance;
            dbCartItem.TotalCost = cartItem.ItemsCost + cartItem.DeliveryCost;

            _dbContext.SaveChanges();

            return new Success<Models.CartItem>(GetCartItem(dbCartItem.Id));
        }

        public IOutcome<Models.CartItem> UpdatePayment(Models.CartItem cartItem)
        {
            var dbCartItem = _dbContext
                .CartItems
                .Include(ci => ci.TransactionRef)
                .SingleOrDefault(ci => ci.Id == cartItem.Id);

            (bool canAction, string error) = _cartValidationService.CanUpdatePayment(dbCartItem);
            if (!canAction)
            {
                return new Failure<Models.CartItem>(error);
            }

            if(dbCartItem.TransactionRef != null)
            {
                dbCartItem.TransactionRef.Trans = cartItem.TransactionRef.Trans;
                dbCartItem.TransactionRef.Transaction = cartItem.TransactionRef.Transaction;
                dbCartItem.TransactionRef.Message = cartItem.TransactionRef.Message;
                dbCartItem.TransactionRef.Reference = cartItem.TransactionRef.Reference;
                dbCartItem.TransactionRef.Trxref = cartItem.TransactionRef.Trxref;
                dbCartItem.TransactionRef.Status = cartItem.TransactionRef.Status;
                dbCartItem.TransactionRef.Redirecturl = cartItem.TransactionRef.Redirecturl;
            }
            else
            {
                dbCartItem.TransactionRef = new Entities.Paystack.TransactionRef()
                {
                    Trans = cartItem.TransactionRef.Trans,
                    Transaction = cartItem.TransactionRef.Transaction,
                    Message = cartItem.TransactionRef.Message,
                    Reference = cartItem.TransactionRef.Reference,
                    Trxref = cartItem.TransactionRef.Trxref,
                    Status = cartItem.TransactionRef.Status,
                    Redirecturl = cartItem.TransactionRef.Redirecturl,
                    CreatedAt = DateTime.Now
                };
            }

            dbCartItem.StatusId = GetCartStatusId(cartItem.TransactionRef.Status);
            dbCartItem.IsPaymentComplete = cartItem.TransactionRef.Status == "success";
             dbCartItem.PaymentCompletedAt = DateTime.Now;
            dbCartItem.OrderNumber = new Random().Next(10000, 99999).ToString();

            _dbContext.SaveChanges();

            return new Success<Models.CartItem>(GetCartItem(dbCartItem.Id));
        }


        public int GetCartStatusId(string status)
        {
            switch (status)
            {
                case "success":
                    return _dbContext.Statuses.Single(s => s.Description == "Payment completed").Id;
                default:
                    return _dbContext.Statuses.Single(s => s.Description == "Awaiting payment").Id;
            }
        }
    }
}
