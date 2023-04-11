using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Group.Queries.Get;

namespace PlatformaEducationala.Core.Repositories;
    public interface IGroupRepository
    {
    Task<List<GroupDto>> GetAll(GetQuery query);
}
