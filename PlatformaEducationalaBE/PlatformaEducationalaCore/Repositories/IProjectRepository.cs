
using PlatformaEducationala.Core.Project.Models;

namespace PlatformaEducationala.Core.Repositories;
    public interface IProjectRepository
    {
        Task<List<ProjectDto>> GetAll();
        Task<ProjectDto> GetById(Guid id);
}
