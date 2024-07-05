using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using backend.Database;
using backend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace backend.Controller.v1
{
    //[EnableCors("AllowSpecificOrigins")]
    [ApiVersion("1.0")]
    // [ApiVersion("2.0", Deprecated = true)]
    [ApiController]
    // [Authorize]
    [Route("api/v1/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly DatabaseContext databaseContext;

        public TransactionController(ILogger<TransactionController> logger, DatabaseContext databaseContext)
        {
            _logger = logger;
            this.databaseContext = databaseContext;
        }

        [HttpGet]
        public IActionResult GetTransactions()
        {
            try
            {
                var result = databaseContext.Transactions
                .FromSqlRaw("SELECT t.transaction_id, t.subtotal, t.discount, " +
                "t.shipping_cost, t.tax_percent, t.total, t.paid, t.change," +
                "t.order_list, t.payment_type, t.payment_detail, t.seller_id," +
                "t.buyer_id, t.comment, t.timestamp, u.Username employee_id " +
                "FROM Transactions t LEFT JOIN Users u ON t.employee_id = u.ID order by t.timestamp desc").ToList();

                return Ok(result);
            }
            catch (Exception error)
            {
                _logger.LogError($"Log GetTransactions: {error}");
                return StatusCode(500, new { message = error });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetTransaction(int id)
        {
            try
            {
                // The FromSqlInterpolated and ExecuteSqlInterpolated
                // methods allow using string interpolation syntax in a way
                // that protects against SQL injection attacks.

                // Combine $ and @ together to get a multiline interpolated string literal
                var result = databaseContext.Transactions.
                FromSqlInterpolated($@"SELECT t.transaction_id, t.subtotal, t.discount, t.shipping_cost, t.tax_percent, 
                t.total, t.paid, t.change, t.order_list, t.payment_type, t.payment_detail, t.seller_id, t.buyer_id,
                t.comment, t.timestamp, u.Username employee_id FROM Transactions t LEFT JOIN Users u ON t.employee_id = u.ID
                WHERE t.transaction_id = {id}").SingleOrDefault();

                if (result == null)
                {
                    return NotFound(new { message = "Transaction Not found" });
                }
                else
                {
                    return Ok(result);
                }
            }
            catch (Exception error)
            {
                _logger.LogError($"Log GetTransaction: {error}");
                return StatusCode(500, new { message = error });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Transaction transaction)
        {
            try
            {
                var accessToken = await HttpContext.GetTokenAsync("access_token");
                var handler = new JwtSecurityTokenHandler();
                var tokenS = handler.ReadToken(accessToken) as JwtSecurityToken;

                // key is case-sensitive
                var userId = tokenS.Claims.First(claim => claim.Type == "id").Value;
                //var position = tokenS.Claims.First(claim => claim.Type == "position").Value;
                transaction.EmployeeId = userId;
                databaseContext.Add(transaction);
                databaseContext.SaveChanges();

                return CreatedAtAction(nameof(GetTransaction), new { id = transaction.TransactionId }, transaction);
            }
            catch (Exception error)
            {
                _logger.LogError($"Log CreateTransaction: {error}");
                return StatusCode(500, new { message = error });
            }
        }

    }
}
