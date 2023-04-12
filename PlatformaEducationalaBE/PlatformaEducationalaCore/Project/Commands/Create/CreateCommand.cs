using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Commands.Create;

public class CreateCommand : IRequest<CreateResponse>
{
    public Guid CurrentUserId { get; set; }
    public string Name { get; set; }
    public bool IsTeacher { get; set; }
}

public class CreateCommandHandler : IRequestHandler<CreateCommand, CreateResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;

    public CreateCommandHandler(IProjectRepository projectRepository, ILogger<CreateCommandHandler> logger)
    {
        _projectRepository = projectRepository;
        _logger = logger;
    }

    public async Task<CreateResponse> Handle(CreateCommand command, CancellationToken cancellationToken)
    {
        var validator = new CreateValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);
        var response = new CreateResponse();

        if (!resultValidation.IsValid)
        {
            _logger.Log(LogLevel.Information, "Given input failed validation:{errors}", resultValidation.Errors);
            return new CreateResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Property {x.PropertyName} failed validation. Error was {x.ErrorMessage}")
                    .ToList(),
                ResponseStatus = ResultStatus.BadRequest
            };
        }

        try
        {
            var id = Guid.NewGuid();
            var project = new Entities.Project
            {
                Name = command.Name,
                Id = id
            };

            if (command.IsTeacher)
                project.TeacherId = command.CurrentUserId;
            else
                project.StudentId = command.CurrentUserId;

            await _projectRepository.CreateAsync(project);
            response.Id = id;
        }
        catch (Exception e)
        {
            response.Errors = new List<string> { $"Eroare la creere{e}" };
            response.ResponseStatus = ResultStatus.InternalError;
        }

        return response;
    }
}