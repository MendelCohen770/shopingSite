namespace ShopingSiteBackend.Models
{
    public class Product
    {
        public int Id { get; set; }          // מזהה ייחודי
        public string Name { get; set; }     // שם המוצר
        public decimal Price { get; set; }   // מחיר המוצר
        public int Stock { get; set; }       // כמות במלאי
    }
}
