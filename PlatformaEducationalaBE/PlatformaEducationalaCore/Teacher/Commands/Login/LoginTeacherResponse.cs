

using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.Teacher.Commands.Login;

public class LoginTeacherResponse: BaseResponse
{
    public string Token { get; set; } = string.Empty;
}
