
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.User.Queries.Get;

public class GetResponse : BaseResponse
{
    public List<StudentDto> Students { get; set; }
}
