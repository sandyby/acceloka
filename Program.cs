using System.Reflection;
using AccelokaSandy.Domain.Entities;
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

builder.Services.AddMediatR(config => config.RegisterServicesFromAssembly(typeof(Program).Assembly)); // ini buat mediatr v12+

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddValidatorsFromAssembly(typeof(Program).Assembly);


builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
// builder.Services.AddScoped<IValidator<Ticket>, CreateTicketValidator>();

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

// TODO: pelajarin jg
builder.Services.AddExceptionHandler<GlobalExceptionHandler>(); 
builder.Services.AddProblemDetails();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Sandy's Accceloka API V1",
        Version = "v1",
        Description = "First time trying out Swagger for this!"
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

app.UseExceptionHandler();
app.MapControllers();
app.Run();