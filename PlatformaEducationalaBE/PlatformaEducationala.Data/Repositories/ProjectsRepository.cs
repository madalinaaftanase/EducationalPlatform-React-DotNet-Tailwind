using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Data.Context;

namespace PlatformaEducationala.Data.Repositories;

public class ProjectsRepository : IProjectRepository
{
    private readonly PlatformDBContext _platformDbContext;

    public ProjectsRepository(PlatformDBContext platformDbContext)
    {
        _platformDbContext = platformDbContext;
    }

    public async Task<List<ProjectDto>> GetAll(Guid studentId)
    {
        var projects = await _platformDbContext.Projects
            .Where(p => p.StudentId.Equals(studentId)).ToListAsync();
        var result = MapperModels<Project, ProjectDto>.MapList(projects);

        return result;
    }

    public async Task<ProjectDto> GetById(Guid id, Guid studentId)
    {
        var project =
            await _platformDbContext.Projects.FirstOrDefaultAsync(p => p.Id == id && p.StudentId == studentId);
        return project == null ? null : MapperModels<Project, ProjectDto>.Map(project);
    }

    public async Task UpdateAsync(ProjectDto project)
    {
        var mappedProject = MapperModels<ProjectDto, Project>.Map(project);
        _platformDbContext.Update(mappedProject);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(ProjectDto project)
    {
        var mappedProject = MapperModels<ProjectDto, Project>.Map(project);
        _platformDbContext.Projects.Remove(mappedProject);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task CreateAsync(Project project)
    {
        await _platformDbContext.AddAsync(project);
        await _platformDbContext.SaveChangesAsync();
    }
}