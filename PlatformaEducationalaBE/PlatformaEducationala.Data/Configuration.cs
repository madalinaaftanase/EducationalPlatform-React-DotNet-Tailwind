using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;
using PlatformaEducationala.Data.Repositories;

namespace PlatformaEducationala.Data;

public static class Configuration
{
    public static void AddDb(this IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("prodDb");

        var services = new ServiceCollection();
        services.AddDbContext<PlatformDBContext>(options =>
        {
            options.UseSqlServer(connectionString);
            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        });
        services.AddScoped<IStudentRepository, StudentsRepository>();
        services.AddScoped<ITeacherRepository, TeachersRepository>();
        services.AddScoped<IProjectRepository, ProjectsRepository>();
        services.AddScoped<IGradeRepository, GradesRepository>();
        services.AddScoped<IGroupRepository, GroupsRepository>();
    }
}