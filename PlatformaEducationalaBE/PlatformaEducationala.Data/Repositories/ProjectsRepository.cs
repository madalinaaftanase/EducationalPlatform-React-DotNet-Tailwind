using System.Data.Entity;
using AutoMapper;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;

namespace PlatformaEducationala.Data.Repositories;

public class ProjectsRepository : IProjectRepository
{
    private readonly IMapper _mapper;
    private readonly PlatformDBContext _platformDbContext;

    public ProjectsRepository(PlatformDBContext platformDbContext, IMapper mapper)
    {
        _platformDbContext = platformDbContext;
        _mapper = mapper;
    }

    public async Task<List<ProjectDto>> GetAll()
    {
        //refactor
        var projects = _platformDbContext.Projects.ToListAsync();
        return _mapper.Map<List<ProjectDto>>(projects);
    }

    public async Task<ProjectDto> GetById(Guid id)
    {
        var project = _platformDbContext.Projects.SingleOrDefault(p => p.Id == id);
        return project ==null? _mapper.Map<ProjectDto>(project):null;
    }
}