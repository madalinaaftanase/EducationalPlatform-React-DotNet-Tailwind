
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

    public Task<string> GetByEmail(string email)
    {
      var result= _platformDbContext.Students.Where(s => s.Email == email).Select(s=>s.Email);
      return (Task<string>)result;
    }

    async Task<List<StudentDto>> IStudentRepository.GetAll()
    {
        return await _platformDbContext.Students.Select(u => new StudentDto { Email = u.Email}).ToListAsync();
    }

}
