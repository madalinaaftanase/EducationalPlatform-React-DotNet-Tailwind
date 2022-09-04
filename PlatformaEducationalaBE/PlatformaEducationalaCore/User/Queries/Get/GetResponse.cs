
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Models;

namespace PlatformaEducationala.Core.User.Queries.Get;

public class GetResponse : BaseResponse
{
    public List<UserDto> Users { get; set; }
}
