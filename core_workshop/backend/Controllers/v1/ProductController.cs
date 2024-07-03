using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Database;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
//using backend.Models;.v1

namespace backend.Controllers.v1
{
    public class Item
    {
        public string? Name { get; set; }
        public int Price { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public DatabaseContext DatabaseContext { get; }
        public IProductRepository ProductRepository { get; }
        public ILogger<ProductController> Logger { get; }

        public ProductController(
            DatabaseContext databaseContext,
            IProductRepository productRepository,
            ILogger<ProductController> logger
        )
        {
            
            DatabaseContext = databaseContext;
            ProductRepository = productRepository;
            Logger = logger;
        }

        [HttpGet]
        public IActionResult GetProducts()
        {
            var products = this.ProductRepository.GetProducts();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await this.DatabaseContext.Products.FindAsync(id);
            return Ok(product);
        }

        [HttpGet("search/name/")]
        public IActionResult SearchProduct([FromQuery] string keyword)
        {
            return Ok($"keyword is {keyword}");
        }

        [HttpPost("post-item")]
        public IActionResult PostItem([FromForm] Item model)
        {
            return Ok($"Name is {model.Name}, {model.Price}");
        }




    }
}