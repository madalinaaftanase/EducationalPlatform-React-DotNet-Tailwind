using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Project.Queries.GetById;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Commands.Update;

public class SaveCommand : IRequest<SaveResponse>
{
    public Guid? OwnerId { get; set; }
    public Guid CurrentUserId { get; set; }
    public Guid Id { get; set; }
    public string? Xml { get; set; }
    public string? Name { get; set; }
    public float? Grade { get; set; }
    public string? Comment { get; set; }
    public bool IsTeacher { get; set; }
}

public class SaveCommandHandler : IRequestHandler<SaveCommand, SaveResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;
    private readonly ITeacherRepository _teacherRepository;

    public SaveCommandHandler(IProjectRepository projectRepository,
        ITeacherRepository teacherRepository,
        ILogger<SaveCommandHandler> logger)
    {
        _logger = logger;
        _projectRepository = projectRepository;
        _teacherRepository = teacherRepository;
    }

    public async Task<SaveResponse> Handle(SaveCommand command, CancellationToken cancellationToken)
    {
        var validator = new SaveValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);
        var response = new SaveResponse();

        var command_to_query = new GetByIdQuery()
        {
            CurrentUserId = command.CurrentUserId,
            OwnerId = command.OwnerId,
            Id = command.Id,
            IsTeacher = command.IsTeacher
        };

        if (!resultValidation.IsValid)
        {
            _logger.LogInformation("Given input failed validation:{errors}", resultValidation.Errors);
            return new SaveResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Proprietatea {x.PropertyName} este invalida")
                    .ToList(),
                ResponseStatus = ResultStatus.BadRequest
            };
        }

        var project = await _projectRepository.GetById(command_to_query);

        if (project == null)
        {
            response.ResponseStatus = ResultStatus.NotFound;
            response.Errors = new List<string> { "Proiectul nu a fost gasit." };
            return response;
        }

        if (project.StudentId == command.CurrentUserId || project.TeacherId == command.CurrentUserId)
        {
            project.Xml = command.Xml ?? project.Xml;
            project.Name = command.Name ?? project.Name;
        }

        var teacher = project.StudentId != Guid.Empty
                ? await _teacherRepository.GetById(command.CurrentUserId)
                : null;

        if (teacher != null)
        {
            project.Grade = command.Grade ?? project.Grade;
            project.Comment = command.Comment ?? project.Comment;
        }

        try
        {
            await _projectRepository.UpdateAsync(project,command.IsTeacher);
        }
        catch (Exception e)
        {
            response.ResponseMessage = $"Eroare la update";
            response.ResponseStatus = ResultStatus.InternalError;
        }

        response.ResponseMessage = "Salvat cu Succes!";
        return response;
    }
}