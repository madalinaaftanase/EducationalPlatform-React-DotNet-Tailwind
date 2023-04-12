using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Project.Queries.Get;
using PlatformaEducationala.Core.Project.Queries.GetById;
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

    public async Task<List<ProjectDto>> GetAll(GetQuery query)
    {
        if (query.IsTeacher)
        {
            var teacherProjects = await _platformDbContext.Projects.Where(t => t.TeacherId.Equals(query.CurrentUserId)).ToListAsync();
            return MapperModels<Project, ProjectDto>.MapList(teacherProjects);
        }
        var studentProjects = await _platformDbContext.Projects
                                    .Where(p => p.StudentId.Equals(query.CurrentUserId)).ToListAsync();
        return MapperModels<Project, ProjectDto>.MapList(studentProjects);
    }

    public async Task<ProjectDto> GetById(GetByIdQuery query)
    {
        if (query.IsTeacher)
        {
            var teacherProject = await _platformDbContext.Projects.FirstOrDefaultAsync(p => p.Id == query.Id && p.TeacherId == query.CurrentUserId);
            
            return teacherProject == null ? null : MapperModels<Project, ProjectDto>.Map(teacherProject);
        }
        var project =
            await _platformDbContext.Projects.FirstOrDefaultAsync(p => p.Id == query.Id && p.StudentId == query.CurrentUserId);
        
        return project == null ? null : MapperModels<Project, ProjectDto>.Map(project);
    }

    public async Task UpdateAsync(ProjectDto project, bool isTeacher)
    {
        var mappedProject = MapperModels<ProjectDto, Project>.Map(project);
        _platformDbContext.Update(mappedProject);

        if (isTeacher)
        {
            mappedProject.StudentId = null;
        }
        else
        {
            mappedProject.TeacherId = null;
        }

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