using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApiProject.Models;

namespace RestApiProject.Repositories
{
    public class InventoryRepository : IInventoryRepository
    {
        private InventoryContext _dbContext;
        
        public InventoryRepository(InventoryContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public async Task<IQueryable<Products>> GetProducts()        
        {
            return _dbContext.Products.AsQueryable();
        }
        
        public async Task<IQueryable<Products>> RetrieveProductsInStock(bool? inStock, IQueryable<Products> products)        
        {
            //var products = _dbContext.Products.AsQueryable();
            if (inStock != null) // Adds the condition to check availability 
            {
                products = products.Where(i => i.AvailableQuantity > 0);
            }

            return products;
        }
        
        public async Task<IQueryable<Products>> GetProduct(int id)        
        {
           // return _dbContext.Products.Where(i => i.AvailableQuantity > 0).AsQueryable();
           var products = _dbContext.Products.AsQueryable();
           return products.Where(i => i.ProductId == id);
        }
        
        public async Task SaveProducts(Products products)
        {
            _dbContext.Entry(products).State = EntityState.Modified;
            
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task AddProducts(Products products)
        {
            await _dbContext.Products.AddAsync(products);
            await _dbContext.SaveChangesAsync();
        }
        
        public async Task<Products> FindProducts(int id)
        {
            var products = await _dbContext.Products.FindAsync(id);
            return products;
        }
        
        public async Task RemoveProducts(Products products)
        {
            _dbContext.Products.Remove(products);
            await _dbContext.SaveChangesAsync();
        }

        public bool ProductExists(int id)
        {
            var productExists = _dbContext.Products.Any(e => e.ProductId == id);
            return productExists;
        }
    }
}