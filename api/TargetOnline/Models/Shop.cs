using System;
using System.Collections.Generic;

namespace TargetOnline.Models
{
    public partial class Shop
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int RatePerKM { get; set; }
        public string EmailAddress { get; set; }
        public string ShopOwnerName { get; set; }
        public string BankCode { get; set; }
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string SubAccountCode { get; set; }
        public int LocationId { get; set; }
        public bool IsDeleted { get; set; }
        public string LogoURL { get; set; }
        public DateTime CreatedAt { get; set; }

        public Location Location { get; set; }
    }
}
