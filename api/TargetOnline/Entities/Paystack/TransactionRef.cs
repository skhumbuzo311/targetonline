using System;

#nullable disable

namespace TargetOnline.Entities.Paystack
{
    public partial class TransactionRef
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string Redirecturl { get; set; }
        public string Reference { get; set; }
        public string Status { get; set; }
        public string Trans { get; set; }
        public string Transaction { get; set; }
        public string Trxref { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
