using Microsoft.EntityFrameworkCore;
using Shoping_Site_beckend.Models;

namespace Shoping_Site_beckend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}

