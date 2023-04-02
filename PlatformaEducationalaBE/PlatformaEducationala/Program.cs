using System.Text;
using Azure.Identity;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PlatformaEducationala.Api.Services;
using PlatformaEducationala.Core.User.Queries.Get;
using PlatformaEducationala.Data;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Platforma educationala",
        Description = "Foloseste endpoint-ul de login sa obtii jwt-ul necesar autorizarii"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Enter 'Bearer token'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement()
    {
        {
            new OpenApiSecurityScheme
            {
                Name="Bearer",
                In = ParameterLocation.Header,
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme ="oauth2"
            },
            new List<string>()
        }
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddDb(builder.Configuration);

builder.Host.ConfigureLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});
builder.Services.AddMediatR(typeof(GetQuery).Assembly);

builder.Services.AddSpaStaticFiles(Configuration => { Configuration.RootPath = " wwwroot/spa"; });

builder.Services.AddCors();

if (!builder.Environment.IsDevelopment())
{
    var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .Build();
    string instrumentationKey = configuration["AppInsightsInstrumentationKey"];

    builder.Services.AddApplicationInsightsTelemetry(instrumentationKey);
}

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
{
    o.TokenValidationParameters =
        new TokenValidationParameters
        {
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };

    o.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = tokenInvalid => { return Task.CompletedTask; }
    };
});

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();

app.UseDefaultFiles();
app.UseSpaStaticFiles();

app.UseRouting();
app.UseHttpsRedirection();
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = string.Empty;
});

if (!app.Environment.IsDevelopment())
{
    builder.Configuration.AddAzureKeyVault(
        new Uri("https://degree-kv.vault.azure.net"),
        new DefaultAzureCredential()).Build();
}

app.UseMiddleware<AuthenticationMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.UseCors(p => p.WithOrigins("http://localhost:3000")
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

app.MapControllers();

if (!app.Environment.IsDevelopment()) app.UseSpa(spa => spa.Options.SourcePath = "wwwroot/spa");
app.Run();