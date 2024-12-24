namespace Shoping_Site_beckend.Models
{
    public class Product
    {
        public int id { get; set; }          // מזהה ייחודי
        public string? name { get; set; }     // שם המוצר
        public decimal? price { get; set; }   // מחיר המוצר
        public int? stock { get; set; }       // כמות במלאי
        public string? imageUrl { get; set; } // כתובת URL של התמונה
    }
}
