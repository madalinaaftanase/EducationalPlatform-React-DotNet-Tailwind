
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.User.Models;
using PlatformaEducationala.Data.Context;
using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Repositories;

public class StudentsRepository : IStudentRepository
{
    private readonly PlatformDBContext _platformDbContext;

    public StudentsRepository(PlatformDBContext platformDbContext)
    {
        _platformDbContext = platformDbContext;
    }

    public async Task AddAsync(Student account)
    {
        await _platformDbContext.AddAsync(account);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task<Student> GetByEmail(string email)
    {
      return await _platformDbContext.Students.Where(s => s.Email == email).FirstOrDefaultAsync();
    }

    public async Task<List<StudentDto>> GetAll()
    {
        return await _platformDbContext.Students.Select(u => new StudentDto { Email = u.Email}).ToListAsync();
    }

}
