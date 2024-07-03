using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
//using backend.Models;

namespace backend.Controllers.v1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public AuthController()
        {
        }


        [Produces("application/json")]
        [ProducesResponseType(typeof(User), 200)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(500)]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] User user)
        {
            return Ok("");
        }



        [HttpPost("[action]")]
        public IActionResult Login([FromBody] User userViewModel)
        {
            return Ok("");
        }

    }
}