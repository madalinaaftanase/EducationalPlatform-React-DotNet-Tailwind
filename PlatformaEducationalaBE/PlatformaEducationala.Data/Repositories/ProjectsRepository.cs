using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Data.Repositories;
    public class ProjectsRepository: IProjectRepository
    {
        public Task<List<ProjectDto>> GetAll()
        {
            throw new NotImplementedException();
        }
    }
