using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Project.Queries.GetById;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Commands.Update;

public class SaveCommand : IRequest<SaveResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid Id { get; set; }
    public string Xml { get; set; }
    public string Name { get; set; }
    public bool IsTeacher { get; set; }
}

public class SaveCommandHandler : IRequestHandler<SaveCommand, SaveResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;

    public SaveCommandHandler(IProjectRepository projectRepository, ILogger<SaveCommandHandler> logger)
    {
        _logger = logger;
        _projectRepository = projectRepository;
    }

    public async Task<SaveResponse> Handle(SaveCommand command, CancellationToken cancellationToken)
    {
        var validator = new SaveValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);
        var response = new SaveResponse();

        var command_to_query = new GetByIdQuery()
        {
            CurrentUserId = command.CurrentUserId,
            Id = command.Id,
            IsTeacher = command.IsTeacher
        };

        if (!resultValidation.IsValid)
        {
            _logger.LogInformation("Given input failed validation:{errors}", resultValidation.Errors);
            return new SaveResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Property {x.PropertyName} failed validation. Error was {x.ErrorMessage}")
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
      
        project.Xml = command.Xml;
        project.Name = command.Name;

        try
        {
            await _projectRepository.UpdateAsync(project,command.IsTeacher);
        }
        catch (Exception e)
        {
            response.ResponseMessage = $"Eroare la update{e}";
            response.ResponseStatus = ResultStatus.InternalError;
        }

        response.ResponseMessage = "Salvat cu Succes!";
        return response;
    }
}