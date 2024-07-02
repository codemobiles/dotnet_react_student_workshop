# GET

```cs
  [HttpGet("")]
        public IActionResult GetAnotherRoot()
        {
            return Ok("Hey");
        }

        [HttpGet("products")]
        public IActionResult GetProducts()
        {
            return Ok("some products");
        }

        [HttpGet("products/{id}")]
        public IActionResult GetProductId(int id)
        {
            return Ok($"product {id}");
        }

        [HttpGet("products/{id}/{type}")]
        public IActionResult GetProductIdAndType(int id, string type)
        {
            return Ok($"product {id}, {type}");
        }

        [HttpGet("products/search")]
        public IActionResult SearchProducts([FromQuery] string keyword)
        {
            return Ok($"search product keyword: {keyword}");
        }
        
        [HttpGet("products/search/{id}/{type}")]
        public IActionResult SearchProductsWith(int id, string type, [FromQuery] string keyword)
        {
            return Ok($"product {id}, {type}, {keyword}");
        }

        [HttpGet("products/all")]
        public IActionResult GetALL()
        {
            return Ok(new string[] {"product1","product2","product3"});
        }
            
```