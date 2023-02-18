using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Project.Models;

namespace PlatformaEducationala.Core.Project.Queries.GetById;
    public class GetByIdResponse : BaseResponse
    {
        public ProjectDto Project { get; set; }
    }
