using PlatformaEducationala.Core.Teacher.Queries.GetStudents;
using PlatformaEducationala.Core.User.Models;
using TeacherEntity = PlatformaEducationala.Core.Entities.Teacher;

namespace PlatformaEducationala.Core.Repositories
{
    public interface ITeacherRepository
    {
        Task<TeacherEntity> GetByEmail(string email);
        Task<TeacherEntity> GetById(Guid id);
        Task AddAsync(TeacherEntity teacher);
        Task<List<StudentTableDto>> GetStudents(GetStudentsQuery query);
    }
}
