using Application.Abstractions.Data;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrationSummary;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using Api.Features.Registrations;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Database
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlite(
builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

// Validators
builder.Services.AddValidatorsFromAssemblyContaining<CreateRegistrationValidator>();
builder.Services.AddScoped<IValidator<CreateRegistrationCommand>, CreateRegistrationValidator>();
// Handlers
builder.Services.AddScoped<CreateRegistrationHandler>();
builder.Services.AddScoped<GetRegistrationsHandler>();
builder.Services.AddScoped<GetRegistrationByIdHandler>();
builder.Services.AddScoped<GetRegistrationSummaryHandler>();

// API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddOpenApi(options => {
    options.AddDocumentTransformer((document, _, _) => {
        document.Info.Title = "Car Show 2027 Registration API";
        document.Info.Description = "Backend API for the AutoVista Events Car Show 2027 registration system.";
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    dbContext.Database.Migrate();
    RegistrationSeeder.Seed(dbContext);
}

// Configure the HTTP request pipeline
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// Root endpoint
app.MapGet("/", () => "Welcome to the Car Show 2027 Registration API! Go to /scalar/v1 for API documentation.");

// Map registration endpoints
app.MapRegistrationEndpoints();
app.Run();