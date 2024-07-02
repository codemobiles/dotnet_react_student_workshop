# new project (method 1)

dotnet new webapi --use-controllers -o backend (controller)
dotnet new webapi -o WebApi (minimal)
dotnet new console -n MyConsoleApp
dotnet run

# run with selecting profile in backend/launchSettings.json

- dotnet run
- dotnet run --launch-profile backend
- dotnet run --launch-profile http
- dotnet run --launch-profile https

# Open default swagger
- http://localhost:5202/swagger/index.html

# Add Controller
- New .cs file
- type "api-controller" snippet
- Change all TModel to string
- dotnet run/watch

# Create simple item
- readme_basic_csharp.md
```cs 
public class Item
    {
        public string? name { get; set; }
        public double? price { get; set; }
        public int? stock { get; set; }
    }


[HttpGet("Item")]
public ActionResult<IEnumerable<Item>> GetItem()
{
    var items = new List<Item>();
    items.Add(new Item {name = "Item 1", price = 10.99, stock = 5 });
    items.Add(new Item {name = "Item 2", price = 20.99, stock = 6 });            
    return items;
}
```cs 


# test with curl

```bash
curl -X 'GET'  'https://localhost:8081/api/v1/Product'  -H 'accept: */*' \\n-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJGb3IgVGVzdGluZyIsImlkIjoiNSIsInVzZXJuYW1lIjoidXNlcjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDYXNoaWVyIiwiZXhwIjoxNjk1NDUwNjk5LCJpc3MiOiJDb2RlTW9iaWxlcyBMdGQiLCJhdWQiOiJodHRwOi8vY29kZW1vYmlsZXMuY29tIn0.wJro1wiYUOMqnZpdaePCr93cll7H7UQzJNd1zkr-06E' | jq
```

# add required database handler packages

```bash
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.AspNetCore.Mvc.NewtonsoftJson
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package Microsoft.AspNetCore.Mvc.Versioning
dotnet add package Microsoft.AspNetCore.Mvc.Versioning.ApiExplorer
dotnet add package Serilog.Extensions.Logging.File
dotnet add package Autofac.Extensions.DependencyInjection
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet add package Microsoft.AspNetCore.OpenApi
dotnet add package Swashbuckle.AspNetCore
```

# Generate self-sign ssl

- https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-dev-certs
- dotnet dev-certs https --clean
- dotnet dev-certs https
- dotnet dev-certs https --trust

# install dotnet-ef

- dotnet tool install --global dotnet-ef
- dotnet tool update --global dotnet-ef
- dotnet tool uninstall --global dotnet-ef
- dotnet-ef --version

# tool path

Linux/macOS ---> $HOME/.dotnet/tools
Windows ---> %USERPROFILE%\.dotnet\tools

# work on both window and mac

- dotnet ef dbcontext scaffold "Server=localhost,1433;user id=sa; password=Mflv[Mflv[; Database=demopos; TrustServerCertificate=true;" Microsoft.EntityFrameworkCore.SqlServer -o Models -c DatabaseContext --context-dir Database

- dotnet ef dbcontext scaffold "connection_string" Microsoft.EntityFrameworkCore.SqlServer -t TableName

- if localhost not work, let's try 127.0.0.1

# change authentication from hardcode to json

- Remove this code in DatabaseContext.cs

```cs
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost,1433;user id=sa; password=Mflv[Mflv[; Database=demopos; Trust Server Certificate=true;");
```

- replace with "ConnectionStrings" in appsetting.\*\*\*\*.json

# change port for auto launch

- launchSettings.json
  "applicationUrl": "https://localhost:8082;http://localhost:8081",

# disable auto launch external url or change default launch url

- .vscode/launch.json
- ex: comment it

`
"serverReadyAction": {
"action": "openExternally",
"pattern": "\\bNow listening on:\\s+(https?://\\S+)",
"uriFormat": "%s/swagger"

            },

`

- comment this block to disable auto

# static file

- Program.cs + wwwroot
  app.UseStaticFiles();

- Example: https://localhost:8081/images/product_01.jpg

# kill all dotnet process

- killall -9 dotnet

# Enable ssl

---

- mac: sudo dotnet dev-certs https --trust
- windows: dotnet dev-certs https --trust

# Update cspro from true to false - to avoid error "Only the invariant culture is supported in globalization-invariant mode."

<InvariantGlobalization>false</InvariantGlobalization>
