

using System.IdentityModel.Tokens.Jwt;

namespace PlatformaEducationala.Api.Services;
public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;

    public AuthenticationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var authorization = context.Request.Headers["Authorization"].ToString();

        if (!string.IsNullOrEmpty(authorization) && authorization.StartsWith("Bearer "))
        {
            var token = authorization.Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken(token);
            var claims = jwt.Claims;
            var userId = claims.FirstOrDefault(c => c.Type == "NameIdentifier")?.Value;

            context.Items["UserId"] = userId;
        }

        await _next(context);
    }
}
