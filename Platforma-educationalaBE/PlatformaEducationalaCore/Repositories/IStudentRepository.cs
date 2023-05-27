using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Teacher.Models;
using PlatformaEducationala.Core.User.Commands.SaveOrUpdateStudentGroup;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Repositories;

public interface IStudentRepository
{
    Task<List<StudentDto>> GetAll();
    Task<StudentDto> GetByEmail(string email);
    Task AddAsync(Student account);
    Task SaveOrUpdateGroup(SaveOrUpdateGroupCommand command);
    Task<List<TeacherDto>> GetTeachers(Guid studentId);
    Task<List<StudentGroup>> GetStudentsGroup(Guid groupId);

    
}