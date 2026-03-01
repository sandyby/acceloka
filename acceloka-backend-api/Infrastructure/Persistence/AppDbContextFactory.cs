using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AccelokaSandy.Infrastructure.Persistence;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        Console.WriteLine("Working directory: " + Directory.GetCurrentDirectory());

        var configPath = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
        Console.WriteLine("Appsettings exists: " + File.Exists(configPath));
        var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();

        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseNpgsql(config.GetConnectionString("Default"));


        return new AppDbContext(optionsBuilder.Options);
    }
}