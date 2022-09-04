
using PlatformaEducationala.Core.Models;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;
using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;

namespace PlatformaEducationala.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly PlatformDBContext _platformDbContext;

    public UserRepository(PlatformDBContext platformDbContext)
    {
        _platformDbContext = platformDbContext;
    }

    public async Task<List<User>> GetAll() => await _platformDbContext.Users.ToListAsync();
}
