using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost::52410/")
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
    new Product("Laptop", "High-performance laptop with 16GB RAM", 1200.99m, "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    new Product("Smartphone", "Latest model with 128GB storage", 799.49m, "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8UGhvbmV8ZW58MHx8MHx8fDA%3D"),
    new Product("Headphones", "Noise-canceling over-ear headphones", 199.99m, "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8SGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D"),
    new Product("Smartwatch", "Waterproof smartwatch with health tracking", 249.99m, "https://plus.unsplash.com/premium_photo-1681147547346-2d73c90988d8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8U21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"),
    new Product("Camera", "Professional DSLR camera with 24MP sensor", 899.99m, "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q2FtZXJhfGVufDB8fDB8fHww")
};

app.MapGet("/products", () =>
{
    return products;
})
.WithName("GetProducts");

app.Run();

record Product(string Name, string Description, decimal Price, string ImageUrl);
