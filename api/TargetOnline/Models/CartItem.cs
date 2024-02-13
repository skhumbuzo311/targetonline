using TargetOnline.Entities.Paystack;
using System;
using System.Collections.Generic;

#nullable disable

namespace TargetOnline.Models
{
    public partial class CartItem
    {
        public CartItem()
        {
            OrderedItems = new HashSet<Product>();
        }

        public int Id { get; set; }
        public int? OrderId { get; set; }
        public int? CreatedByUserId { get; set; }
        public int UpdatedByUserId { get; set; }
        public int? PickUpAddressId { get; set; }
        public int? TransactionRefId { get; set; }
        public string Status { get; set; }
        public decimal ItemsCost { get; set; }
        public decimal DeliveryCost { get; set; }
        public decimal TotalCost { get; set; }
        public string OrderNumber { get; set; }
        public decimal DeliveryDistance { get; set; }
        public bool IsPaymentComplete { get; set; }
        public DateTime? PaymentCompletedAt { get; set; }
        public DateTime CreatedAt { get; set; }

        public Location PickUpAddress { get; set; }
        public User CreatedByUser { get; set; }
        public Location DeliveryAddress { get; set; }
        public TransactionRef TransactionRef { get; set; }
        public IEnumerable<string> imagesUrls { get; set; }
        public virtual IEnumerable<Product> OrderedItems { get; set; }
    }
}
