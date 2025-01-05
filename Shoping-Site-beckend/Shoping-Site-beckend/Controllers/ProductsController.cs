using Microsoft.AspNetCore.Mvc;
using Shoping_Site_beckend.Models;
using Microsoft.AspNetCore.Authorization;
using Shoping_Site_beckend.Queries;
using Shoping_Site_beckend.Enums;

namespace Shoping_Site_beckend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class  ProductsController : ControllerBase
    {
        private readonly IProductsQueries _productsQueries;

        public ProductsController(IProductsQueries productsQueries)
        {
            _productsQueries = productsQueries;
        }
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _productsQueries.GetAllProductsAsync();
            if (products.Count == 0) 
            {
                return NotFound("Not found Products.");
            }
            return Ok(products);
        }
        [Authorize(Roles = nameof(RoleEnum.admin))]
        [HttpPost("create_product")]
        public async Task<IActionResult> CreateProduct([FromBody] Product newProduct)
        {
            if (newProduct == null || string.IsNullOrEmpty(newProduct.name) || newProduct.stock <= 0 || newProduct.price <= 0)
            {
                return BadRequest("You need to fill in all the details!");
            }
            await _productsQueries.CreateProductAsync(newProduct);
            return Ok(new { message = "Product created successfully!", productId = newProduct.id });
        }
        [Authorize(Roles = nameof(RoleEnum.admin))]
        [HttpGet("delete_product/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productsQueries.GetProductById(id);
            if (product == null)
            {
                return NotFound("Product not found!");
            }
            await _productsQueries.DeleteProductAsync(product);
            return Ok(new { message = "Product deleted successfully!" });
        }
    }
}