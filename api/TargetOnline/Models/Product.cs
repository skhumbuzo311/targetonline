using System;
namespace TargetOnline.Models
{

    public class Product    
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }
        public int WeightKG { get; set; }
        public bool IsDeleted { get; set; }
        public string Description { get; set; }
        public string ImageURL { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
