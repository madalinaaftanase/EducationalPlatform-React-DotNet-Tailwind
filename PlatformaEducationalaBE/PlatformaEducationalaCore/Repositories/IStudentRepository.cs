using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.User.Commands.SaveOrUpdateStudentGroup;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Repositories;

public interface IStudentRepository
{
    Task<List<StudentDto>> GetAll();
    Task<StudentDto> GetByEmail(string email);
    Task AddAsync(Student account);
    Task SaveOrUpdateGroup(SaveOrUpdateGroupCommand command);
    Task<Entities.Teacher> GetTeacher(Guid studentId);

}
