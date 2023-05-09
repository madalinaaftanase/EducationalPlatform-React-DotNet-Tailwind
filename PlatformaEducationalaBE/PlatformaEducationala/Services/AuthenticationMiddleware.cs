using System.IdentityModel.Tokens.Jwt;

namespace PlatformaEducationala.Api.Services;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthenticationMiddleware(RequestDelegate next)
    {
        _next = next ?? throw new ArgumentNullException(nameof(next));
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path;
        var endpointsToExclude = new[]
        {
            "/api/Auth/Login/Student", "/api/Auth/Login/Teacher", "/api/Auth/Register/Teacher",
            "/api/Auth/Register/Student"
        };

        if (endpointsToExclude.Any(endpoint => endpoint == path))
        {
            await _next(context);
            return;
        }

        var authorization = context.Request.Headers["Authorization"].ToString();

        if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
        {
            var token = authorization.Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);
            var claims = jwt.Claims;
            var userId = claims.FirstOrDefault(c =>
                c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
            if (userId == null)
            {
                context.Response.StatusCode = 401;
                return;
            }

            context.Items["UserId"] = userId;
        }
        else
        {
            context.Response.StatusCode = 401;
            return;
        }

        await _next(context);
    }
}