using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApiProject.Models;
using RestApiProject.Repositories;

namespace RestApiProject.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IInventoryRepository _inventory;

        public ProductsController(InventoryContext context)
        {
            _inventory = new InventoryRepository(context);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts(bool? inStock)
        {
            var products = await _inventory.GetProducts();

            var productsInStock = await _inventory.RetrieveProductsInStock(inStock, products);
            
            return await productsInStock.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Products>>> GetProduct(int id)
        {
            var products = await _inventory.GetProduct(id);

            if (products == null)
            {
                return NotFound();
            }

            return await products.ToListAsync();
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Products products)
        {
            if (id != products.ProductId)
            {
                return BadRequest();
            }
            
            try
            { 
                await _inventory.SaveProducts(products);
            }
            
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Products>> PostProducts(Products products)
        {
            await _inventory.AddProducts(products);

            return CreatedAtAction("GetProducts", new { id = products.ProductId }, products);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Products>> DeleteProducts(int id)
        {

            var products = await _inventory.FindProducts(id);
            
            if (products == null)
            {
                return NotFound();
            }

            await _inventory.RemoveProducts(products);

            return products;
        }

        private bool ProductsExists(int id)
        {
            var productExists = _inventory.ProductExists(id);
            return productExists;
        }
    }
}