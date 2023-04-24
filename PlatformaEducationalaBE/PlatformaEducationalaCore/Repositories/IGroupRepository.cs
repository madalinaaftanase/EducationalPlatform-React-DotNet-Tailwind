using PlatformaEducationala.Core.Group.Commands.DeleteStudentGroup;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Group.Queries.Get;

namespace PlatformaEducationala.Core.Repositories;

public interface IGroupRepository
{
    Task<List<GroupDto>> GetAll(GetQuery query);
    Task DeleteStudentGroup(DeleteStudentGroupCommand command);
    Task AddStudentGroup(Guid studentId, Guid groupId);
}