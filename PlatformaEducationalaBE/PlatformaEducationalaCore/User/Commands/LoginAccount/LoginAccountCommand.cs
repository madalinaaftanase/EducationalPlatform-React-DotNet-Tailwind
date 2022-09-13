
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PlatformaEducationala.Core.User.Commands.LoginAccount;

public class LoginAccountCommand : IRequest<LoginAccountResponse>
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginAccountCommandHandler : IRequestHandler<LoginAccountCommand, LoginAccountResponse>
{
    private readonly IStudentRepository _studentRepository;
    public LoginAccountCommandHandler(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }
    public async Task<LoginAccountResponse> Handle(LoginAccountCommand command, CancellationToken cancellationToken)
    {
        var response = new LoginAccountResponse();
        var user = await _studentRepository.GetByEmail(command.Email);


        if (user == null)
        {
            response.Errors.Add("User do not exist");
            response.ResponseStatus = Enums.ResultStatus.BadRequest;
            return response;
        }

        bool isValidPassword = BCrypt.Net.BCrypt.Verify(command.Password, user.Password);
        if (!isValidPassword)
        {
            response.Errors.Add("Incorect password");
            response.ResponseStatus = Enums.ResultStatus.BadRequest;
            return response;
        }

        string token = CreateToken(user);

        if (token == null)
        {
            response.ResponseStatus = Enums.ResultStatus.InternalError;
            return response;
        }

        response.Token = token;

        return response;
    }
    private string CreateToken(Student user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier , user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.GivenName, user.FirstName),
            new Claim(ClaimTypes.Surname, user.LastName),
        };

        SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("fb102217-6494-48e2-9d32-b3c068020a87"));
        var token = new JwtSecurityToken(
            claims:claims,
            signingCredentials: new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256)
            );
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
