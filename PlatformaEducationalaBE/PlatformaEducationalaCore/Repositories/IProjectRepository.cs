
using PlatformaEducationala.Core.Project.Models;

namespace PlatformaEducationala.Core.Repositories;
    public interface IProjectRepository
    {
        Task<List<ProjectDto>> GetAll(Guid userId);
        Task<ProjectDto> GetById(Guid id, Guid studentId);
}
