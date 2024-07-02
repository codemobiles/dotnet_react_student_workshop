using backend.Database;
using backend.Models;

namespace backend.Services
{
    public class ProductRepository : IProductRepository
    {
        public DatabaseContext DatabaseContext { get; }

        public ProductRepository(DatabaseContext databaseContext)
        {
            DatabaseContext = databaseContext;
        }


        public IEnumerable<Product> GetProducts()
        {
            return this.DatabaseContext.Products.ToList();
        }
    }


}