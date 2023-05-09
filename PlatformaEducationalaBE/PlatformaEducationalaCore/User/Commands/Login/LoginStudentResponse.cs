
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.User.Commands.LoginAccount;

public class LoginStudentResponse : BaseResponse
{
    public string Token { get; set; } = string.Empty;
    public string Username { get; set; }
}
