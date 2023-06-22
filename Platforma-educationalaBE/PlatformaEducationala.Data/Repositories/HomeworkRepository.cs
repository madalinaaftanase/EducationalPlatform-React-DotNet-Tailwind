using System.Data.Entity;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Homework.Models;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;

namespace PlatformaEducationala.Data.Repositories;

public class HomeworkRepository : IHomeworkRepository
{
    private readonly PlatformDBContext _platformDbContext;

    public HomeworkRepository(PlatformDBContext platformDbContext)
    {
        _platformDbContext = platformDbContext;
    }

    public Task<List<HomeworkDto>> GetHomeworksByUserId(Guid userId)
    {
        return Task.FromResult(_platformDbContext.Homeworks
            .Where(h => h.Teacher.Id == userId || h.Student.Id == userId)
            .Select(h => new HomeworkDto
            {
                Id = h.Id,
                Name = h.Name,
                TeacherId = h.TeacherId,
                StudentId = h.StudentId,
                ProjectId = h.ProjectId
            })
            .ToList());
    }

    public async Task AddHomework(Guid teacherId, Guid studentId, string name)
    {
        var homework = new Homework
        {
            Name = name,
            TeacherId = teacherId,
            StudentId = studentId
        };

        _platformDbContext.Homeworks.Add(homework);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task Update(HomeworkDto homework)
    {
        var mappedHomework = MapperModels<HomeworkDto, Homework>.Map(homework);
        _platformDbContext.Update(mappedHomework);
        await _platformDbContext.SaveChangesAsync();
    }
}
