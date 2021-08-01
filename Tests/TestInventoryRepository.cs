using System.Collections.Generic;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Results;
using Microsoft.EntityFrameworkCore;
using RestApiProject;
using RestApiProject.Controllers;
using RestApiProject.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using RestApiProject.Repositories;
using Assert = NUnit.Framework.Assert;


namespace Tests
{
    [TestFixture]
    public class TestProductsController
    {
        private DbContextOptions<InventoryContext> dbContextOptions = new DbContextOptionsBuilder<InventoryContext>()
            .UseInMemoryDatabase(databaseName: "Inventory")
            .Options;
        private ProductsController controller;
        
        [TestCase]
        public void GetProducts_ShouldReturnAllProducts()
        {
            //Arrange
            var dbContext = new InventoryContext(dbContextOptions);
            var repository = new InventoryRepository(dbContext);
            var testProduct = new Products { ProductId = 1, Name = "Demo1", Category = "ABC", UnitPrice = 1, AvailableQuantity = 1 };
            var testProduct2 = new Products { ProductId = 2, Name = "Demo2", Category = "ABC", UnitPrice = 1, AvailableQuantity = 1 } ;
            repository.AddProducts(testProduct2);
            repository.AddProducts(testProduct);

            //Act
            var products = repository.GetProducts().Result;
            var result = repository.RetrieveProductsInStock(true, products).Result.Count();
            
            //Assert
            Assert.AreEqual(result, 2);
        }

        [TestCase]
        public void GetAProduct_ShouldReturnOneProduct()
        {
            //Arrange
            var dbContext = new InventoryContext(dbContextOptions);
            var repository = new InventoryRepository(dbContext);
            var testProduct = new Products { ProductId = 1, Name = "Demo1", Category = "ABC", UnitPrice = 1, AvailableQuantity = 1 };
            var testProduct2 = new Products { ProductId = 2, Name = "Demo2", Category = "ABC", UnitPrice = 1, AvailableQuantity = 1 } ;
            repository.AddProducts(testProduct2);
            repository.AddProducts(testProduct);

            //Act
            var products = repository.GetProduct(1).Result;
            var result = repository.RetrieveProductsInStock(true, products).Result.Count();
            
            //Assert
            Assert.AreEqual(result, 1);
        }
        
        [TestCase]
        public void DeleteAProduct_ShouldDeleteOneProduct()
        {
            //Arrange
            var dbContext = new InventoryContext(dbContextOptions);
            var repository = new InventoryRepository(dbContext);
            var testProduct = new Products { ProductId = 1, Name = "Demo1", Category = "ABC", UnitPrice = 1, AvailableQuantity = 1 };
            var testProduct2 = new Products { ProductId = 2, Name = "Demo2", Category = "ABC", UnitPrice = 1, AvailableQuantity = 1 } ;
            repository.AddProducts(testProduct2);
            repository.AddProducts(testProduct);
            
            //Act
            repository.RemoveProducts(testProduct2);
            var products = repository.GetProducts().Result;
            var result = repository.RetrieveProductsInStock(true, products).Result.Count();
            
            //Assert
            Assert.AreEqual(result, 1);
        }
    }
}

