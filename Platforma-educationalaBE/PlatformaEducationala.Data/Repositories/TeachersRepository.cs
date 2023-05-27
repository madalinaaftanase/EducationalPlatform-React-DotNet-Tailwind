using AutoMapper;
using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.Teacher.Queries.GetStudents;
using PlatformaEducationala.Core.User.Models;
using PlatformaEducationala.Data.Context;

namespace PlatformaEducationala.Data.Repositories;

public class TeachersRepository : ITeacherRepository
{
    private readonly PlatformDBContext _platformDbContext;

    public TeachersRepository(PlatformDBContext platformDbContext)
    {
        _platformDbContext = platformDbContext;
    }

    public async Task<Teacher> GetById(Guid teacherId)
    {
        var teacher = await _platformDbContext.Teachers
            .Include(t => t.Groups)
            .FirstOrDefaultAsync(t => t.Id == teacherId);

        return teacher;
    }

    public async Task AddAsync(Teacher teacher)
    {
        await _platformDbContext.Teachers.AddAsync(teacher);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task<List<StudentTableDto>> GetStudents(GetStudentsQuery query)
    {
        var students = await _platformDbContext.Students
            .Include(s => s.StudentGroups)
            .ThenInclude(sg => sg.Group)
            .Where(s => s.StudentGroups.Any(sg => sg.Group.TeacherId == query.TeacherId))
            .Select(s=>new StudentTableDto()
            {
                Email = s.Email,
                Firstname = s.Firstname,
                GroupName = s.StudentGroups.Where(sg => sg.Group.TeacherId == query.TeacherId).FirstOrDefault().Group.Name,
                Lastname = s.Lastname,
                Id = s.Id,
                GroupId = s.StudentGroups.Where(sg => sg.Group.TeacherId == query.TeacherId).FirstOrDefault().Group.Id
            })
            .ToListAsync();

        return students;
    }

    public async Task<Teacher> GetByEmail(string email)
    {
        return await _platformDbContext.Teachers.FirstOrDefaultAsync(t => t.Email == email);
    }
}