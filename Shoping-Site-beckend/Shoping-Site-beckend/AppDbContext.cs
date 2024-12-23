using Microsoft.EntityFrameworkCore;
using ShopingSiteBackend.Models;

namespace Shoping_Site_beckend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }

        public DbSet<User> Users { get; set; }
    }
}
