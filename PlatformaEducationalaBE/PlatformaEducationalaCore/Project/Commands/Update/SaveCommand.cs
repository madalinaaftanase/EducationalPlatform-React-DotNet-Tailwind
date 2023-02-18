using MediatR;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Repositories;
using Serilog;

namespace PlatformaEducationala.Core.Project.Commands.Update;

public class SaveCommand : IRequest<SaveResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid Id { get; set; }
    public string Xml { get; set; }
    public string Name { get; set; }
}

public class SaveCommandHandler : IRequestHandler<SaveCommand, SaveResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;

    public SaveCommandHandler(IProjectRepository projectRepository, ILogger logger)
    {
        _logger = logger;
        _projectRepository = projectRepository;
    }

    public async Task<SaveResponse> Handle(SaveCommand command, CancellationToken cancellationToken)
    {
        var validator = new SaveValidator();
        var resultValidation = await validator.ValidateAsync(command, cancellationToken);
        var response = new SaveResponse();

        if (!resultValidation.IsValid)
        {
            _logger.Information("Given input failed validation:{errors}", resultValidation.Errors);
            return new SaveResponse
            {
                Errors = resultValidation.Errors
                    .Select(x => $"Property {x.PropertyName} failed validation. Error was {x.ErrorMessage}")
                    .ToList(),
                ResponseStatus = ResultStatus.BadRequest
            };
        }

        var project = _projectRepository.GetById(command.Id, command.CurrentUserId);
        if (project == null)
        {
            response.ResponseStatus = ResultStatus.NotFound;
            response.Errors = new List<string> { "Proiectul nu a fost gasit." };
            return response;
        }

        if (project.Result.StudentId != command.CurrentUserId) // ???
        {
            response.ResponseStatus = ResultStatus.Forbidden;
            response.Errors = new List<string> { "Nu ai acces la acest proiect" };
            return response;
        }

        response.ResponseMessage = "Salvat cu Succes!";
        return response;
    }
}