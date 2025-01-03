using Microsoft.AspNetCore.Mvc;
using Shoping_Site_beckend.Models;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using Shoping_Site_beckend.Hubs;
using BCrypt.Net;


namespace Shoping_Site_beckend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IUserConnectionService _userConnectionService;

        public UsersController(AppDbContext context, IUserConnectionService userConnectionService)
        {
            _context = context;
            _userConnectionService = userConnectionService;
        }
        [Authorize(Roles = "admin")]
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();  // מבצע קריאה למסד הנתונים
            var connectedUsers = _userConnectionService.GetAllUsers();  // מקבל את כל המשתמשים המחוברים

            // מבצע חיבור של המידע על המשתמשים עם מידע החיבור
            var userInfos = users.Select(u => new UserInfo
            {
                id = u.id,
                username = u.username,
                email = u.email,
                password = "***",
                Role = u.Role,
                isConnected = connectedUsers.Any(c => c.username == u.username && c.isConnected)  // בדיקה אם המשתמש מחובר
            }).ToList();

            return Ok(userInfos);
        }

        [HttpPost("singUp")]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            if (newUser == null || string.IsNullOrEmpty(newUser.username) || string.IsNullOrEmpty(newUser.password) || string.IsNullOrEmpty(newUser.email))
            {
                return BadRequest("You need to fill in all the details!");
            }

            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.username == newUser.username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists!");
            }

            if (newUser.password == "111")
            {
                newUser.Role = "admin";
            };

            newUser.password = BCrypt.Net.BCrypt.HashPassword(newUser.password);
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User created successfully!", userId = newUser.id });
        }

        private readonly string _secretKey = "your-very-strong-and-secure-secret-key123456";


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.username == loginRequest.username);

            if (user == null)
            {
                return Unauthorized("User Not Found!");
            }
            bool isValid = BCrypt.Net.BCrypt.Verify(loginRequest.password, user.password);
            if(!isValid)
            {
                return Unauthorized("Invalid Password!");
            }

            // יצירת טוקן JWT
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "yourIssuer",
                audience: "yourAudience",
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // שליחת הטוקן בקוקי
            Response.Cookies.Append("AuthToken", tokenString, new CookieOptions
            {
                HttpOnly = false,
                Secure = true,    // עובד רק על HTTPS
                Expires = DateTime.Now.AddHours(3), // תוקף הטוקן
                SameSite = SameSiteMode.Strict // מונע שליחה לאתרים אחרים
            });

            user.password = "***";

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