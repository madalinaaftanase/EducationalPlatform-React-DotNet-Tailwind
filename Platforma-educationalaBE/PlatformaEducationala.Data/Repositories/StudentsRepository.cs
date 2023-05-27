using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.Teacher.Models;
using PlatformaEducationala.Core.User.Commands.SaveOrUpdateStudentGroup;
using PlatformaEducationala.Core.User.Models;
using PlatformaEducationala.Data.Context;

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

    public async Task SaveOrUpdateGroup(SaveOrUpdateGroupCommand command)
    {
        var oldStudentGroup = _platformDbContext.StudentGroups.Find(command.StudentId, command.OldGroupId);

        var newStudentGroup = new StudentGroup
        {
            StudentId = command.StudentId,
            GroupId = command.NewIdGroup
        };

        if (oldStudentGroup != null) _platformDbContext.StudentGroups.Remove(oldStudentGroup);

        _platformDbContext.StudentGroups.Add(newStudentGroup);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task<List<TeacherDto>> GetTeachers(Guid studentId)
    {
        var teachers = await _platformDbContext.Teachers
            .Include(t => t.Groups)
            .ThenInclude(sg => sg.StudentGroups)
            .Where(t => t.Groups
                .Any(g => g.StudentGroups
                    .FirstOrDefault(sg => sg.Student.Id == studentId) != null)).ToListAsync();


        return MapperModels<Teacher, TeacherDto>.MapList(teachers);
    }

    public async Task<List<StudentGroup>> GetStudentsGroup(Guid groupId)
    {
        var studentsGroup = await _platformDbContext.StudentGroups
            .Where(g => g.GroupId == groupId)
            .ToListAsync();
        return studentsGroup;
    }


    public async Task<StudentDto> GetByEmail(string email)
    {
        var student = await _platformDbContext.Students.FirstOrDefaultAsync(s => s.Email == email);

        return MapperModels<Student, StudentDto>.Map(student);
    }

    public async Task<List<StudentDto>> GetAll()
    {
        var students = await _platformDbContext.Students.ToListAsync();
        return MapperModels<Student, StudentDto>.MapList(students);
    }
}