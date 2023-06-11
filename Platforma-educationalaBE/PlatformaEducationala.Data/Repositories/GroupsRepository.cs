using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Group.Commands.DeleteStudentGroup;
using PlatformaEducationala.Core.Group.Models;
using PlatformaEducationala.Core.Group.Queries.Get;
using PlatformaEducationala.Core.Group.Queries.GetStudents;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.Teacher.Models;
using PlatformaEducationala.Core.User.Models;
using PlatformaEducationala.Data.Context;

namespace PlatformaEducationala.Data.Repositories;

public class GroupsRepository : IGroupRepository
{
    private readonly PlatformDBContext _platformDbContext;

    public GroupsRepository(PlatformDBContext platformDbContext)
    {
        _platformDbContext = platformDbContext;
    }

    public async Task<List<GroupDto>> GetAll(GetQuery query)
    {
        var result = new List<GroupDto>();
        if (query.IsTeacher)
        {
            var teacherGroups = await _platformDbContext.Groups
                .Where(t => t.TeacherId.Equals(query.CurrentUserId)).ToListAsync();
            result = MapperModels<Group, GroupDto>.MapList(teacherGroups);

            return result;
        }

        var groups = await _platformDbContext.StudentGroups
                .Include(sg => sg.Group)
                .Where(sg => sg.StudentId == query.CurrentUserId)
                .Select(sg => sg.Group)
                .ToListAsync()
            ;

        result = MapperModels<Group, GroupDto>.MapList(groups);
        return result;
    }

    public async Task DeleteStudentGroup(DeleteStudentGroupCommand command)
    {
        var studentGroup = _platformDbContext.StudentGroups.Find(command.StudentId, command.GroupId);

        if (studentGroup != null) _platformDbContext.StudentGroups.Remove(studentGroup);

        await _platformDbContext.SaveChangesAsync();
    }

    public async Task AddStudentGroup(Guid studentId, Guid groupId)
    {
        var studentGroup = await _platformDbContext.StudentGroups.FindAsync(studentId, groupId);
        if (studentGroup != null) return;

        var newStudentGroup = new StudentGroup
        {
            StudentId = studentId,
            GroupId = groupId
        };

        try
        {
            _platformDbContext.StudentGroups.Add(newStudentGroup);
            await _platformDbContext.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
    }

    public async Task<GroupDto> GetById(Guid id)
    {
        var group = await _platformDbContext.Groups
            .Where(g => g.Id == id)
            .Include(t => t.Teacher)
            .Select(g => new GroupDto
            {
                Id = g.Id,
                TeacherId = g.TeacherId,
                Name = g.Name,
                Teacher = new TeacherDto
                {
                    Email = g.Teacher.Email,
                    Firstname = g.Teacher.Firstname,
                    Lastname = g.Teacher.Lastname,
                    Id = g.Teacher.Id
                }
            })
            .FirstOrDefaultAsync();

        return group;
    }

    public async Task Update(GroupDto group)
    {
        var mappedGroup = MapperModels<GroupDto, Group>.Map(group);
        _platformDbContext.Update(mappedGroup);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task Add(GroupDto group)
    {
        var mappedGroup = MapperModels<GroupDto, Group>.Map(group);
        _platformDbContext.Add(mappedGroup);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task<List<StudentDto>> GetStudentsGroup(GetStudentsQuery query)
    {
        var students = await _platformDbContext.Students
            .Include(s => s.StudentGroups)
            .ThenInclude(sg => sg.Group)
            .Where(s => s.StudentGroups.Any(sg => sg.GroupId == query.GroupId))
            .ToListAsync();

        return MapperModels<Student, StudentDto>.MapList(students);
    }

    public async Task DeleteGroup(Guid groupId)
    {
        var group = _platformDbContext.Groups.Find(groupId);

        if (group != null) _platformDbContext.Groups.Remove(group);

        await _platformDbContext.SaveChangesAsync();
    }
}