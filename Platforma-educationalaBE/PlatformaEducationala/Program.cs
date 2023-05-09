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


builder.Services.AddControllers();

builder.Services.AddRazorPages(options =>
{
    options.Conventions.AddPageRoute("/", "/Index");
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Platforma educationala",
        Description = "Foloseste endpoint-ul de login sa obtii jwt-ul necesar autorizarii"
    });

    var securityScheme = new OpenApiSecurityScheme()
    {
        Description = "Enter 'Bearer token'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "bearer"
    };
    var securityRequirement = new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "bearerAuth"
                },
            },
            new string[]{ }
        }
    };
    options.AddSecurityDefinition("bearerAuth", securityScheme);
    options.AddSecurityRequirement(securityRequirement);
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
builder.Configuration.AddJsonFile("appsettings.Development.json", optional: true, reloadOnChange: true);

builder.Host.ConfigureLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
});
builder.Services.AddMediatR(typeof(GetQuery).Assembly);

builder.Services.AddSpaStaticFiles(Configuration => { Configuration.RootPath = "wwwroot/spa"; });

builder.Services.AddCors();

bool.TryParse(builder.Configuration["isDev"], out bool isDev);
if (!isDev)
{
    string instrumentationKey = builder.Configuration["AppInsightsInstrumentationKey"];
    builder.Services.AddApplicationInsightsTelemetry(instrumentationKey);

    builder.Configuration.AddAzureKeyVault(
        new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
        new DefaultAzureCredential());
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

builder.Services.AddDb(builder.Configuration);

var app = builder.Build();
app.UseRouting();
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseSpaStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    DefaultContentType = "text/plain",
    RequestPath = ""
});

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    options.RoutePrefix = "swagger";
});

app.UseMiddleware<AuthenticationMiddleware>();
app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: default,
        pattern: "{controller}/{action=Index}/{id?}");
});

app.MapControllers();

app.UseSpa(spa =>
{
    // spa.Options.SourcePath = "../../Platforma-educationalaUI/build";
    // spa.UseProxyToSpaDevelopmentServer("http://localhost:57437");
    spa.Options.SourcePath = "wwwroot/spa";
});

app.Run();