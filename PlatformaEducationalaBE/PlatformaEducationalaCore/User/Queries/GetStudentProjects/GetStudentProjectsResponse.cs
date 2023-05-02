using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Project.Models;

namespace PlatformaEducationala.Core.User.Queries.GetStudentsProjects;
    public class GetStudentProjectsResponse : BaseResponse
    {
        public List<ProjectDto> Projects { get; set; }
    }
