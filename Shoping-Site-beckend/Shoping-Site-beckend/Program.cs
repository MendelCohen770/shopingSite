//using Microsoft.EntityFrameworkCore;
//using Shoping_Site_beckend.Data;


using Microsoft.EntityFrameworkCore;
using Shoping_Site_beckend.Models;


var builder = WebApplication.CreateBuilder(args);

// הוספת DbContext עם החיבור ל-MySQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                     new MySqlServerVersion(new Version(8, 0, 32)))); // עדכון לגרסה שלך



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
            Console.WriteLine($"User: {user.Username}");
        }
    }
    else
    {
        Console.WriteLine("Users not found!.");
    }
}


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
