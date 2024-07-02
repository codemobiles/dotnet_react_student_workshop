# Option 1# Direct Injection
# Option 2# Repository Service Injection

## Option 1# Direct Injection
-------------------------------------------------------------------------------------
1. Prepare mssql database in docker
2. Add dotnet ef package
```sh
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

3. Run dotnet ef cli 
```sh
dotnet ef dbcontext scaffold "Server=localhost,1433;user id=sa; password=Mflv[Mflv[; Database=istock; TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -o Entities -c DatabaseContext --context-dir Data
```

4. Add this code in Program.cs to add database service
```cs 
builder.Services.AddDbContext<DatabaseContext>(options => options.UseSqlServer("Server=localhost,1433;user id=sa; password=Mflv[Mflv[; Database=demopos; TrustServerCertificate=true;"));
```

5. Inject Database Context Service in to the target controller
```cs
        public DatabaseContext Context { get;set; }
        
        public DemoController(DatabaseContext context)
        {
            this.Context = context;
        }

        [HttpGet("Products>")]
        public IActionResult GetProducts()
        {                        
            return Ok(this.Context.Products.OrderByDescending(p => p.ProductId).ToList());
        }
```        

6. dotnet run - ทดสอบได้เลยว่า query


## Option 2# Repository Service Injection and Using Installer
-------------------------------------------------------------------------------------

1. Prepare mssql database in docker
2. Add dotnet ef package
```sh
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```

3. Run dotnet ef cli 
```sh
dotnet ef dbcontext scaffold "Server=localhost,1433;user id=sa; password=Mflv[Mflv[; Database=istock; TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -o Entities -c DatabaseContext --context-dir Data
```

4. Implement DBInstaller.cs which is automatically loaded by IInstaller and InstallerExtensions.cs
5. In Program.cs builder.Services.InstallServiceInAssembly(builder.Configuration);
6. Create pair of IProductRepository and ProductRepository
```cs
public IEnumerable<Product> GetProducts()
        {
            return _context.Products.OrderByDescending(p => p.ProductId).ToList(); // sort by ProductId
        }
```

7. DI to target controller
