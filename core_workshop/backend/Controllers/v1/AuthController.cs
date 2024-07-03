using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Services;
using backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
//using backend.Models;

namespace backend.Controllers.v1
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository authRepository;
        public AuthController(IAuthRepository authRepository)
        {
            this.authRepository = authRepository;
        }


        [Produces("application/json")]
        [ProducesResponseType(typeof(User), 200)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(500)]
        [HttpPost("[action]")]
        public IActionResult Register([FromBody] User user)
        {
            this.authRepository.Register(user);
            return Ok(new { result = "ok", message = "register successfully" });
        }



        [HttpPost("[action]")]
        public IActionResult Login([FromBody] LoginViewModel userViewModel)
        {
            return Ok("");
        }

    }
}