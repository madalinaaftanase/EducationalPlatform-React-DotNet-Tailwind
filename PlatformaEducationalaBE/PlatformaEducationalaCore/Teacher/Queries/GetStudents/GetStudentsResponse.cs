using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Teacher.Queries.GetStudents;
    public class GetStudentsResponse: BaseResponse
    {
        public List<StudentTableDto> Students { get; set; }
}
