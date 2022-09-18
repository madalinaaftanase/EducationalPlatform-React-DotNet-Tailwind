
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;
using Microsoft.EntityFrameworkCore;

namespace PlatformaEducationala.Data.Repositories
{
    public class TeachersRepository : ITeacherRepository
    {
        private readonly PlatformDBContext _platformDbContext;

        public TeachersRepository(PlatformDBContext platformDbContext)
        {
            _platformDbContext = platformDbContext;
        }

        public async Task AddAsync(Teacher teacher)
        {
            await _platformDbContext.Teachers.AddAsync(teacher);
            await  _platformDbContext.SaveChangesAsync();
        }

        public async Task<Teacher> GetByEmail(string email)
        {
            return await _platformDbContext.Teachers.Where(t=>t.Email==email).FirstOrDefaultAsync();
        }
    }
}
