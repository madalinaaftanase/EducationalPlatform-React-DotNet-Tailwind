using PlatformaEducationala.Core.Homework.Commands.AddHome;
using PlatformaEducationala.Core.Homework.Models;

namespace PlatformaEducationala.Core.Repositories;

public interface IHomeworkRepository
{
    Task<List<HomeworkDto>> GetHomeworksByUserId(Guid userId);
    Task AddHomework(Guid teacherId, Guid studentId, string name);
    Task Update(HomeworkDto homework);
}