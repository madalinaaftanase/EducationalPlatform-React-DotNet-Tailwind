
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Project.Models;

namespace PlatformaEducationala.Core.Project.Queries.Get;

public class GetResponse : BaseResponse
{
    public List<ProjectDto> Projects { get; set; }
}

