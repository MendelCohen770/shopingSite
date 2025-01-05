using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shoping_Site_beckend.Db;
using Shoping_Site_beckend.Models;
using System.ComponentModel;

namespace Shoping_Site_beckend.Queries
{
    public interface IUsersQueries
    {
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByNameAsync(string username);
        Task<User?> CreateUserAsync(User newUser);
        Task<List<User>> GetAdminsUsersAsync();
    }
    public class UsersQueries : IUsersQueries
    {
        private readonly AppDbContext _context;
        public UsersQueries(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            var users = await _context.Users.ToListAsync();
            if (users.Count == 0)
            {
                Console.WriteLine("Not users found.");
                return [];
            }
            return users;
        }

        public async Task<User?> GetUserByNameAsync(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.username == username);
            if (user == null)
            {
                Console.WriteLine("User was not found.");
                return null;
            }
            return user;
        }
        public async Task<User?> CreateUserAsync(User newUser)
        {
            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            Console.WriteLine("Create user successfully!!!");
            return newUser;
        }

        public async Task<List<User>> GetAdminsUsersAsync()
        {
            var users = await _context.Users.Where(u => u.Role == Enums.RoleEnum.admin).ToListAsync();
            if (users.Count == 0)
            {
                Console.WriteLine("Not found admins.");
                return [];
            }
            return users;
        }
    }
}
