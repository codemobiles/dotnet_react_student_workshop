using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace backend.ViewModels
{
    public class ProductViewModel
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Name, maximum length 100")]
        public string Name { get; set; }

        [Range(0, 10000)]
        public int Stock { get; set; }

        [Range(0, 1_000_000)]
        public int Price { get; set; }

        public IFormFile Image { get; set; }
    }
}