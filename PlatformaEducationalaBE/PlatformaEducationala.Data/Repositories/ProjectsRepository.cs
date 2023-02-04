using System.Data.Entity;
using AutoMapper;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;

namespace PlatformaEducationala.Data.Repositories;
    public class ProjectsRepository: IProjectRepository
    {
        private readonly PlatformDBContext _platformDbContext;
        private readonly IMapper _mapper;
    public ProjectsRepository(PlatformDBContext platformDbContext, IMapper mapper)
    {
        _platformDbContext = platformDbContext;
        _mapper = mapper;
    }
    public async Task<List<ProjectDto>> GetAll()
        {
            var projects = _platformDbContext.Projects.ToListAsync();
            return _mapper.Map<List<ProjectDto>>(projects);
    }
    }
