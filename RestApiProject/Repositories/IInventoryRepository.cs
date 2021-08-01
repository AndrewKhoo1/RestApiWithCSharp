using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RestApiProject.Models;

namespace RestApiProject.Repositories
{
    public interface IInventoryRepository
    {
        public Task<IQueryable<Products>> RetrieveProductsInStock(bool? inStock, IQueryable<Products> products);    
        public Task<IQueryable<Products>> GetProducts();
        public Task<IQueryable<Products>> GetProduct(int id);
        public Task SaveProducts(Products products);
        public Task AddProducts(Products products);
        public Task<Products> FindProducts(int id);
        public Task RemoveProducts(Products products);
        public bool ProductExists(int id);


    }
}