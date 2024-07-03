using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
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
        public IMapper Mapper { get; set; }
        public AuthController(IAuthRepository authRepository, IMapper mapper)
        {
            this.Mapper = mapper;
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

            var user = this.Mapper.Map<User>(userViewModel);
            (User? result, string token) = authRepository.Login(user);
            if (result == null)
            {
                return Unauthorized(new { token = "", message = "username invalid" });
            }

            if (String.IsNullOrEmpty(token))
            {
                return Unauthorized(new { token = "", message = "password invalid" });
            }

            return Ok(new { token = token, message = "login successfully" });
        }

    }
}