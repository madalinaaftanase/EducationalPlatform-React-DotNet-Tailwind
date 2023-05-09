
using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Group.Queries.GetStudents;
    public class GetStudentsResponse: BaseResponse
    {
        public IList<StudentDto> Students { get; set; }
    }
