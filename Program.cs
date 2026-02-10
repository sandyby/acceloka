using System.Reflection;
using AccelokaSandy.Infrastructure.Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, services, configuration) =>
{
    configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext();
});

builder.Services.AddMediatR(Assembly.GetExecutingAssembly()); // old method karena microsoft.extensions.dependencyinjection support maks. mediatr v11.1.0

// builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly)); // ini buat mediatr v12+

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);
builder.Services.AddFluentValidationAutoValidation();

// TODO:  pelajarin
/*
.AddFluentValidation(fv =>
    {
        // Automatically register all validators in the assembly
        fv.RegisterValidatorsFromAssemblyContaining<UserRegistrationValidator>();
    });

// Optional: Explicitly register validators
builder.Services.AddScoped<IValidator<UserRegistrationRequest>, UserRegistrationValidator>();
*/

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo{
        Title="Sandy's Accceloka API V1",
        Version="v1",
        Description="First time trying out Swagger for this!"
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Sandy's Acceloka API v1");
    });
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();