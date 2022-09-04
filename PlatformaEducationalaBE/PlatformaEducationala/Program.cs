using MediatR;
using Microsoft.OpenApi.Models;
using PlatformaEducationala.Core.User.Queries.Get;
using PlatformaEducationala.Data;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddSwaggerGen(options =>
    {
        options.SwaggerDoc("v1", new OpenApiInfo
        {
            Version = "v1",
            Title = "Platforma educationala",
            Description = "Aici o sa fie o descriere pt endpoints"
        });
    });

builder.Services.AddDB(builder.Configuration);

builder.Services.AddMediatR(typeof(GetQuery).Assembly);

builder.Services.AddSpaStaticFiles(Configuration =>
{
    Configuration.RootPath = " wwwroot/spa";
});


builder.Services.AddCors();

builder.Host.UseSerilog((ctx, lc) => lc
    .WriteTo.Console()
    .WriteTo.File("../logs/logging.txt"));

var app = builder.Build();

app.UseDefaultFiles();
app.UseSpaStaticFiles();

app.UseRouting();
app.UseHttpsRedirection();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseAuthorization();

app.UseCors(p => p.WithOrigins("http://localhost:3000")
   .AllowAnyHeader()
   .AllowAnyMethod());

app.MapControllers();

//will use the angular static files only when the environment is different from the developement one
if (!app.Environment.IsDevelopment())
{
    app.UseSpa(spa => spa.Options.SourcePath = "wwwroot/spa");
}
app.Run();
