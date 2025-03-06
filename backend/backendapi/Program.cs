using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:59314/")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");

var products = new[]
{
    new Product("Laptop", "High-performance laptop with 16GB RAM", 1200.99m, "https://example.com/laptop.jpg"),
    new Product("Smartphone", "Latest model with 128GB storage", 799.49m, "https://example.com/smartphone.jpg"),
    new Product("Headphones", "Noise-canceling over-ear headphones", 199.99m, "https://example.com/headphones.jpg"),
    new Product("Smartwatch", "Waterproof smartwatch with health tracking", 249.99m, "https://example.com/smartwatch.jpg"),
    new Product("Camera", "Professional DSLR camera with 24MP sensor", 899.99m, "https://example.com/camera.jpg")
};

app.MapGet("/products", () =>
{
    return products;
})
.WithName("GetProducts");

app.Run();

record Product(string Name, string Description, decimal Price, string ImageUrl);
