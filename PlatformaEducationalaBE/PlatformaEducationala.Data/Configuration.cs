using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;
using PlatformaEducationala.Data.Repositories;


namespace PlatformaEducationala.Data;

    public static class Configuration
    {
        public static void AddDB(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Main");

            services.AddDbContext<PlatformDBContext>(options => options.UseSqlServer(connectionString)); 
            services.AddScoped<IStudentRepository, StudentsRepository>();
        }
    }

