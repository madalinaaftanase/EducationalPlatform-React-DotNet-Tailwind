
using MediatR;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.Utils;

namespace PlatformaEducationala.Core.User.Commands.LoginAccount;

public class LoginStudentCommand : IRequest<LoginStudentResponse>
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginStudentCommandHandler : IRequestHandler<LoginStudentCommand, LoginStudentResponse>
{
    private readonly IStudentRepository _studentRepository;
    public LoginStudentCommandHandler(IStudentRepository studentRepository)
    {
        _studentRepository = studentRepository;
    }
    public async Task<LoginStudentResponse> Handle(LoginStudentCommand command, CancellationToken cancellationToken)
    {
        var response = new LoginStudentResponse();
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

        string token = CreateToken.GenerateToken(user, "student");

        if (token == null)
        {
            response.ResponseStatus = Enums.ResultStatus.InternalError;
            return response;
        }

        response.Token = token;
        return response;
    }
}
