using TeacherEntity = PlatformaEducationala.Core.Entities.Teacher;

namespace PlatformaEducationala.Core.Repositories
{
    public interface ITeacherRepository
    {
        Task<TeacherEntity> GetByEmail(string email);
        Task AddAsync(TeacherEntity teacher);
    }
}
