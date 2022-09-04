
namespace PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Models;

public interface  IUserRepository
{
    Task<List<User>> GetAll();
}
