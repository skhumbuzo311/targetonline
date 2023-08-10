using System;

namespace TargetOnline.Models
{
    public partial class UserRating
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int OrderId { get; set; }
        public int Rating { get; set; }
        public bool IsDeliveryManRating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
    }
}
