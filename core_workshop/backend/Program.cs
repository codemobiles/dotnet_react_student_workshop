using backend.Database;
using backend.Installers;
using backend.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.InstallServiceInAssembly(builder.Configuration);

builder.Services.AddTransient<IProductRepository, ProductRepository>();
builder.Services.AddTransient<IAuthRepository, AuthRepository>();


// make sure call this because used in ProductController
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddControllers();
// Learn more about configurin g Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Write log file
builder.Host.ConfigureLogging((hostingContext, builder) => { builder.AddFile("Logs/cmpos_api-{Date}.txt", LogLevel.Debug, null, false, null, null); });


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseCors("AllowSpecificOrigins");
app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();
app.MapControllers();

app.Run();
