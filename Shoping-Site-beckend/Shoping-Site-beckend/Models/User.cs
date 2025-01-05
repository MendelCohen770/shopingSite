using Shoping_Site_beckend.Enums;

namespace Shoping_Site_beckend.Models
{

    public class User
    {
        public int id { get; set; }
        public required string username { get; set; }
        public required string password { get; set; }
        public required string email { get; set; }
        public  RoleEnum? Role { get; set; } = RoleEnum.user;
    }

}
