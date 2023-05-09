using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace PlatformaEducationala.Api.Services;

    public static class AuthorizationConfiguration
    {
    //    public static void AddAuthorization(this IServiceCollection services)
    //    {
    //        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(AuthorizationContextBehaviour<,>));
    //        services.AddTransient<IAuthorizationHandler, TeacherRequirementsHandler>();
    //        services.AddTransient<IAuthorizationHandler, StudentRequirementsHandler>();
    //        services.AddAuthorization(options =>
    //        {
    //            options.AddPolicy("Teacher",
    //                policy => policy.Requirements.Add(new TeacherRequirements()));
    //            options.AddPolicy("Student",
    //                policy => policy.Requirements.Add(new StudentRequirements()));
    //        });
    //    }
    }
