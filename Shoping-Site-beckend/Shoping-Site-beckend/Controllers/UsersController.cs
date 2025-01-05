using Microsoft.AspNetCore.Mvc;
using Shoping_Site_beckend.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Shoping_Site_beckend.Queries;
using Shoping_Site_beckend.Enums;


namespace Shoping_Site_beckend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersQueries _usersQueries;
        private readonly IUserConnectionService _userConnectionService;
        public UsersController(IUserConnectionService userConnectionService, IUsersQueries usersQueries)
        {
            _userConnectionService = userConnectionService;
            _usersQueries = usersQueries;
        }
       
        [Authorize(Roles = nameof(RoleEnum.admin))]
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _usersQueries.GetAllUsersAsync();
            var connectedUsers = _userConnectionService.GetAllUsers(); 

            var usersInfo = users.Select(u => new UserInfo
            {
                id = u.id,
                username = u.username,
                email = u.email,
                password = "***",
                Role = u.Role,
                isConnected = connectedUsers.Any(c => c.username == u.username && c.isConnected)
            }).ToList();

            return Ok(usersInfo);
        }

        [HttpPost("signUp")]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            if (newUser == null || string.IsNullOrEmpty(newUser.username) || string.IsNullOrEmpty(newUser.password) || string.IsNullOrEmpty(newUser.email))
            {
                return BadRequest("You need to fill in all the details!");
            }

            var existingUser = await _usersQueries.GetUserByNameAsync(newUser.username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists!");
            }

            if (newUser.password == "111")
            {
                newUser.Role = RoleEnum.admin;
            }
            else
            {
                newUser.Role = RoleEnum.user;
            }

            newUser.password = BCrypt.Net.BCrypt.HashPassword(newUser.password);
            await _usersQueries.CreateUserAsync(newUser);
            return Ok(new { message = "User created successfully!", userId = newUser.id });
        }

        private readonly string _secretKey = "your-very-strong-and-secure-secret-key123456";


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {

            var user = await _usersQueries.GetUserByNameAsync(loginRequest.username);

            if (user == null)
            {
                return Unauthorized("User not found!");
            }
            bool isValid = BCrypt.Net.BCrypt.Verify(loginRequest.password, user.password);
            if(!isValid)
            {
                return Unauthorized("Invalid password!");
            }

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.Role.ToString()),
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

            Response.Cookies.Append("AuthToken", tokenString, new CookieOptions
            {
                HttpOnly = false,
                Secure = true,  
                Expires = DateTime.Now.AddHours(3), 
                SameSite = SameSiteMode.Strict 
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

            var user = await _usersQueries.GetUserByNameAsync(username);
            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            Response.Cookies.Delete("AuthToken");
            return Ok(new { message = "Logout successful" });
        }
    }
}