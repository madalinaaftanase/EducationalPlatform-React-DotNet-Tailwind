
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Project.Queries.Get;
using PlatformaEducationala.Core.Project.Queries.GetById;

namespace PlatformaEducationala.Core.Repositories;
    public interface IProjectRepository
    {
        Task<List<ProjectDto>> GetAll(GetQuery query);
        Task<ProjectDto> GetById(GetByIdQuery query);
        Task UpdateAsync(ProjectDto project, bool isTeacher);
        Task DeleteAsync(ProjectDto project);
        Task CreateAsync(Entities.Project project);

    }
