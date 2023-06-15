using Microsoft.EntityFrameworkCore;
using PlatformaEducationala.Core.Entities;
using PlatformaEducationala.Core.Project.Models;
using PlatformaEducationala.Core.Project.Queries.Get;
using PlatformaEducationala.Core.Project.Queries.GetById;
using PlatformaEducationala.Core.Repositories;
using PlatformaEducationala.Core.User.Models;
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
            var teacherProjects = await _platformDbContext.Projects.Where(t => t.TeacherId.Equals(query.CurrentUserId))
                .ToListAsync();
            return MapperModels<Project, ProjectDto>.MapList(teacherProjects);
        }

        var studentProjects = await _platformDbContext.Projects
            .Include(p => p.StudentProjects)
            .Where(p => p.StudentProjects.Any(sp => sp.StudentId.Equals(query.CurrentUserId)))
            .ToListAsync();
        return MapperModels<Project, ProjectDto>.MapList(studentProjects);
    }

    public async Task<ProjectDto> GetById(GetByIdQuery query)
    {
        var ownerId = query.CurrentUserId;

        if (query.OwnerId != Guid.Empty && query.OwnerId.HasValue) ownerId = (Guid)query.OwnerId;

        var project = await _platformDbContext.Projects
            .Include(p => p.StudentProjects)
            .ThenInclude(sp => sp.Student)
            .Select(p => new ProjectDto
            {
                Id = p.Id,
                Name = p.Name,
                Xml = p.Xml,
                TeacherId = p.TeacherId,
                Comment = p.Comment,
                Grade = p.Grade,
                Students = p.StudentProjects.Select(sp => new StudentDto
                {
                    Id = sp.StudentId,
                    Firstname = sp.Student.Firstname,
                    Lastname = sp.Student.Lastname,
                    Email = sp.Student.Email
                }).ToList()
            })
            .FirstOrDefaultAsync(p =>
                p.Id == query.Id &&
                (p.TeacherId == ownerId || p.Students.Any(sp => sp.Id == ownerId)));

        return project;
    }

    public async Task UpdateAsync(ProjectDto project, bool isTeacher)
    {
        var mappedProject = MapperModels<ProjectDto, Project>.Map(project);
        _platformDbContext.Update(mappedProject);

        if (mappedProject.TeacherId == Guid.Empty)
            mappedProject.TeacherId = null;

        await _platformDbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(ProjectDto project)
    {
        var mappedProject = MapperModels<ProjectDto, Project>.Map(project);
        _platformDbContext.Projects.Remove(mappedProject);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task CreateAsync(Project project, Guid? studentId)
    {
        if (studentId.HasValue)
            await _platformDbContext.StudentProjects.AddAsync(new StudentProject
            {
                ProjectId = project.Id,
                StudentId = studentId.Value
            });
        await _platformDbContext.AddAsync(project);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task AddStudent(Guid studentId, Guid projectId)
    {
        var studentProject = await _platformDbContext.StudentProjects.FindAsync(studentId, projectId);
        if (studentProject != null) return;

        var newStudentProject = new StudentProject
        {
            StudentId = studentId,
            ProjectId = projectId
        };

        _platformDbContext.StudentProjects.Add(newStudentProject);
        await _platformDbContext.SaveChangesAsync();
    }

    public async Task RemoveStudent(Guid studentId, Guid projectId)
    {
        var studentProject = await _platformDbContext.StudentProjects.FindAsync(studentId, projectId);
        if (studentProject != null) _platformDbContext.StudentProjects.Remove(studentProject);

        await _platformDbContext.SaveChangesAsync();
    }
}