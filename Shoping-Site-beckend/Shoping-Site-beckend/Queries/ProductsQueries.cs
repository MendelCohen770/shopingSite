using Microsoft.EntityFrameworkCore;
using Shoping_Site_beckend.Db;
using Shoping_Site_beckend.Models;

namespace Shoping_Site_beckend.Queries
{
    public interface IProductsQueries
    {
        Task<List<Product>> GetAllProductsAsync();
        Task<Product> CreateProductAsync(Product newProduct);
        Task<Product?> GetProductById(int id);
        Task<Product> DeleteProductAsync(Product product);
    }
    public class ProductsQueries : IProductsQueries
    {
        private readonly AppDbContext _context;
        public ProductsQueries(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProductsAsync()
        {
            var products = await _context.Products.ToListAsync();
            if (products.Count == 0)
            {
                Console.WriteLine("Not products found.");
                return [];
            }
            return products;
        }

        public async Task<Product> CreateProductAsync(Product newProduct)
        {
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            Console.WriteLine("Create product successfully!!!");
            return newProduct;
        }

        public async Task<Product?> GetProductById(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product == null)
            {
                Console.WriteLine("Not product found by ID.");
                return null;
            }
            return product;
        }

        public async Task<Product> DeleteProductAsync(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            Console.WriteLine("Delete product successfully!!!"); 
            return product;
        }
    }
}
