namespace TargetOnline.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public bool IsDeleted { get; set; }
    }
}
