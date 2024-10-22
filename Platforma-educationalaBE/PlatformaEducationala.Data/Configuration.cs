﻿using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;
using PlatformaEducationala.Data.Repositories;

namespace PlatformaEducationala.Data;

public static class Configuration
{
    public static void AddDb(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration["prodDb"];

        services.AddDbContext<PlatformDBContext>(options =>
        {
            options.UseSqlServer(connectionString);
            options.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        });
        services.AddScoped<IStudentRepository, StudentsRepository>();
        services.AddScoped<ITeacherRepository, TeachersRepository>();
        services.AddScoped<IProjectRepository, ProjectsRepository>();
        services.AddScoped<IGroupRepository, GroupsRepository>();
        services.AddScoped<IHomeworkRepository, HomeworkRepository>();
    }
}