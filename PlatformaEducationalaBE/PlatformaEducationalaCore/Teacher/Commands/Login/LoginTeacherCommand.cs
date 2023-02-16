

using MediatR;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.Utils;

namespace PlatformaEducationala.Core.Teacher.Commands.Login;

public class LoginTeacherCommand : IRequest<LoginTeacherResponse>
{
    public string Email { get; set; }
    public string Password { get; set; }
}

public class LoginTeacherCommandHandler : IRequestHandler<LoginTeacherCommand, LoginTeacherResponse>
{
    private readonly ITeacherRepository _teacherRepository;
    public LoginTeacherCommandHandler(ITeacherRepository teacherRepository)
    {
        _teacherRepository = teacherRepository;
    }

    public async Task<LoginTeacherResponse> Handle(LoginTeacherCommand command, CancellationToken cancellationToken)
    {
        var response = new LoginTeacherResponse();
        var user = await _teacherRepository.GetByEmail(command.Email);


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

        string token = CreateToken.GenerateToken(user,"teacher");

        if (token == null)
        {
            response.ResponseStatus = Enums.ResultStatus.InternalError;
            return response;
        }

        response.Token = token;
        return response;
    }
}
