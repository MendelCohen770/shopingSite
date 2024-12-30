namespace Shoping_Site_beckend.Models
{
    public class UserInfo
    {
        public int id { get; set; }
        public string? username { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
        public string? Role { get; set; }
        public bool isConnected { get; set; }
    }
}