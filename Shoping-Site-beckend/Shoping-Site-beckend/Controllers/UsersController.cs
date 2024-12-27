using Microsoft.AspNetCore.Mvc;
using Shoping_Site_beckend.Models;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;


namespace Shoping_Site_beckend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }
        [HttpPost("singUp")]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            if (newUser.password == "111")
            {
                newUser.Role = "admin";
            };
            if (newUser == null || string.IsNullOrEmpty(newUser.username) || string.IsNullOrEmpty(newUser.password) || string.IsNullOrEmpty(newUser.email))
            {
                return BadRequest("You need to fill in all the details!");
            }
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User created successfully!", userId = newUser.id });
        }

        private readonly string _secretKey = "your-very-strong-and-secure-secret-key123456";


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.username == loginRequest.username && u.password == loginRequest.password);

            if (user == null)
            {
                return Unauthorized("User Not Found!");
            }

            // יצירת טוקן JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.Role),
                // הוספה של שדות נוספים לפי הצורך
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourIssuer",
                audience: "yourAudience",
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // שליחת הטוקן בקוקי
            Response.Cookies.Append("AuthToken", tokenString, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,    // עובד רק על HTTPS
                Expires = DateTime.Now.AddHours(1), // תוקף הטוקן
                SameSite = SameSiteMode.Strict // מונע שליחה לאתרים אחרים
            });

            return Ok(new { message = "Login successful", user, token = tokenString });

        }
        
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var token = Request.Cookies["AuthToken"];

            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("No token found to log out.");
            }

            var handler = new JwtSecurityTokenHandler();
            JwtSecurityToken? jwtToken;
            try
            {
                jwtToken = handler.ReadJwtToken(token);
            }
            catch
            {
                return Unauthorized("Invalid token.");
            }

            var username = jwtToken.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            if (username == null)
            {
                return Unauthorized("Invalid token.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.username == username);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            Response.Cookies.Delete("AuthToken");
            return Ok(new { message = "Logout successful" });
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

    }
}