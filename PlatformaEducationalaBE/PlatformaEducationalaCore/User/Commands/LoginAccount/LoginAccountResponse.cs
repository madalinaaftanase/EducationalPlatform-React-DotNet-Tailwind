
using PlatformaEducationala.Core.Common;

namespace PlatformaEducationala.Core.User.Commands.LoginAccount;

public class LoginAccountResponse :BaseResponse
{
    public string Token { get; set; }=string.Empty;
}
