using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Group.Models;

namespace PlatformaEducationala.Core.Group.Queries.Get;

public class GetResponse : BaseResponse
{
    public List<GroupDto> Groups { get; set; }
}
