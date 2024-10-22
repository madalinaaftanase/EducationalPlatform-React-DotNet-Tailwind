﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace PlatformaEducationala.Core.Utils;

public static class CreateToken
{
    public static string GenerateToken(Common.User user, string role)
    {
        //var config = new ConfigurationBuilder().AddJsonFile($"appsettings.json", true, true).Build();
        //var secretKey = config["secretKey"];

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.GivenName, user.Firstname),
            new Claim(ClaimTypes.Surname, user.Lastname),
            new Claim(ClaimsIdentity.DefaultRoleClaimType, role)
        };

        SecurityKey securityKey =
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes("fb102217-6494-48e2-9d32-b3c068020a87"));
        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256),
            expires: DateTime.UtcNow.AddHours(12)
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}