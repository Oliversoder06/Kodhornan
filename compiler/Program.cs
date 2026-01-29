var builder = WebApplication.CreateBuilder(args);

// 🔴 IMPORTANT: listen on Fly's internal port
builder.WebHost.UseUrls("http://0.0.0.0:8080");

// Add services
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors();

// Health check route
app.MapGet("/", () => "Compiler is running");

app.MapControllers();

app.Run();
