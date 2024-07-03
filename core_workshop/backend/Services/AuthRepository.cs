using System.Linq;
using backend.Database;
using backend.Models;
using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Installers;

namespace backend.Services
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatabaseContext _context;
        // private readonly JwtSettings _jwtSettings;

        public AuthRepository(DatabaseContext context)
        {
            // _jwtSettings = jwtSettings;
            _context = context;
        }

        public (User?, string) Login(User user)
        {

        }

        public void Register(User user)
        {

        }

    }

}
