namespace ShopingSiteBackend.Models
{
    public class User
    {
        public int Id { get; set; }               // מזהה ייחודי
        public string Username { get; set; }      // שם משתמש
        public string Password { get; set; }      // סיסמה (ניתן להצפין בהמשך)
        public string Email { get; set; }         // כתובת אימייל
        public string Role { get; set; }          // תפקיד: "Admin" או "User"
    }
}
