using MediatR;
using Microsoft.Extensions.Logging;
using PlatformaEducationala.Core.Enums;
using PlatformaEducationala.Core.Project.Queries.GetById;
using PlatformaEducationala.Core.Repositories;

namespace PlatformaEducationala.Core.Project.Commands.Delete;

public class DeleteCommand : IRequest<DeleteResponse>
{
    public Guid CurrentUserId { get; set; }
    public Guid Id { get; set; }
    public bool isTeacher { get; set; }
}

public class DeleteCommandHandler : IRequestHandler<DeleteCommand, DeleteResponse>
{
    private readonly ILogger _logger;
    private readonly IProjectRepository _projectRepository;

    public DeleteCommandHandler(ILogger<DeleteCommandHandler> logger, IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
        _logger = logger;
    }

    public async Task<DeleteResponse> Handle(DeleteCommand command, CancellationToken cancellationToken)
    {
        var response = new DeleteResponse();
        var command_to_query = new GetByIdQuery()
        {
            CurrentUserId = command.CurrentUserId,
            Id = command.Id,
            IsTeacher = command.isTeacher
        };
        var project = await _projectRepository.GetById(command_to_query);
        if (project == null)
        {
            response.Errors = new List<string> { "Proiectul nu a fost gasit" };
            response.ResponseStatus = ResultStatus.NotFound;
            return response;
        }

        try
        {
            _projectRepository.DeleteAsync(project);
        }
        catch (Exception e)
        {
            response.Errors = new List<string> { $"Eroare la stergere{e}" };
            response.ResponseStatus = ResultStatus.InternalError;
        }

        response.ResponseMessage = "Proiect sters cu success";
        return response;
    }
}