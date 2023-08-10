namespace TargetOnline.Models.HttpResponses
{
    public class BalanceTopUpResponse
    {
        public string LoadedByUser { get; set; }
        public Entities.User LoadedToUser { get; set; }
        public decimal LoadedAmount { get; set; }
    }
}
