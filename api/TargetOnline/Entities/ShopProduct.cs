using System;

namespace TargetOnline.Entities
{
    public class ShopProduct
    {
        public int Id { get; set; }
        public int ShopId { get; set; }
        public int ProductId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedAt { get; set; }

        public Shop Shop { get; set; }
        public Product Product { get; set; }
    }
}
