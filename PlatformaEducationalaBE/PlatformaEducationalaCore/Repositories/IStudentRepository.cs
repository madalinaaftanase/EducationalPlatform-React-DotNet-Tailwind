
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Repositories;

public interface IStudentRepository
{
    Task<List<StudentDto>> GetAll();
    Task<Student> GetByEmail(string email);
    Task AddAsync(Student account);
}
