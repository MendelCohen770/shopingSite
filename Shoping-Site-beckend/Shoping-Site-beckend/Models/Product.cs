namespace Shoping_Site_beckend.Models
{
    public class Product
    {
        public int id { get; set; }       
        public string? name { get; set; }  
        public decimal? price { get; set; }  
        public int? stock { get; set; }   
        public string? imageUrl { get; set; } 
    }
}
