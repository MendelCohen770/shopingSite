using Microsoft.AspNetCore.Mvc;
using Shoping_Site_beckend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;


namespace Shoping_Site_beckend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class  ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
        [Authorize(Roles = "admin")]
        [HttpPost("create_product")]
        public async Task<IActionResult> CreateProduct([FromBody] Product newProduct)
        {
            if (newProduct == null || string.IsNullOrEmpty(newProduct.name) || newProduct.stock <= 0 || newProduct.price <= 0)
            {
                return BadRequest("You need to fill in all the details!");
            }
            await _context.Products.AddAsync(newProduct);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Product created successfully!", productId = newProduct.id });
        }
        [Authorize(Roles = "admin")]
        [HttpGet("delete_product/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            //(p => p.id == id);
            if (product == null)
            {
                return NotFound("Product Not Found!");
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Product deleted successfully!" });
        }
        [HttpGet("search_product/{name}")]
        public async Task<IActionResult> SherchtProduct(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
            {
                return BadRequest("Please provide a valid product name.");
            }

            var products = await _context.Products.Where(p => EF.Functions.Like(p.name, $"%{name}%")).ToListAsync();


            if (products == null || !products.Any())
            {
                return NotFound("Product not found.");
            }
            return Ok(products);
        }

    }
}