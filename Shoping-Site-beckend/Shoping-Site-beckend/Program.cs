//using Microsoft.EntityFrameworkCore;
//using Shoping_Site_beckend.Data;


using Microsoft.EntityFrameworkCore;
using Shoping_Site_beckend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;



var builder = WebApplication.CreateBuilder(args);

// הוספת DbContext עם החיבור ל-MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                     new MySqlServerVersion(new Version(8, 0, 32)))); // עדכון לגרסה שלך

// קונפיגורציה של Authentication ו-JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "yourIssuer",
            ValidAudience = "yourAudience",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("yourSecretKey"))
        };
    });


// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var users = dbContext.Users.ToList();  // שליפת כל המשתמשים

    if (users.Any())
    {
        Console.WriteLine("DB connect!!!");
        foreach (var user in users)
        {
            Console.WriteLine($"User: {user.username}");
        }
    }
    else
    {
        Console.WriteLine("Users not found!.");
    }
}

app.UseAuthentication();  // מוסיף את Authentication
app.UseAuthorization();   // מוסיף את Authorization


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
Console.Beep();

app.Run();
