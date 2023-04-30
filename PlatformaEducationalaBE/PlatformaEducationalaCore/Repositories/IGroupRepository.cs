using PlatformaEducationala.Core.Group.Commands.AddOrUpdate;
using PlatformaEducationala.Core.Group.Commands.DeleteStudentGroup;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Group.Queries.Get;
using PlatformaEducationala.Core.Group.Queries.GetStudents;
using PlatformaEducationala.Core.User.Models;

namespace PlatformaEducationala.Core.Repositories;

public interface IGroupRepository
{
    Task<List<GroupDto>> GetAll(GetQuery query);
    Task DeleteStudentGroup(DeleteStudentGroupCommand command);
    Task AddStudentGroup(Guid studentId, Guid groupId);
    Task<GroupDto> GetById(Guid groupId);
    Task AddOrUpdate(GroupDto group);
    Task<List<StudentDto>> GetStudentsGroup(GetStudentsQuery query);

    Task DeleteGroup(Guid groupId);
}