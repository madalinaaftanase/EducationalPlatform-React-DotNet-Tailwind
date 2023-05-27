using PlatformaEducationala.Core.Common;
using PlatformaEducationala.Core.Teacher.Models;

namespace PlatformaEducationala.Core.User.Queries.GetStudentTeachers;
    public class GetStudentTeachersResponse : BaseResponse
    {
        public List<TeacherDto> Teachers { get; set; }
}
